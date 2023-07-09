<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import CustomerService from '@/service/CustomerService';
import ProductService from '@/service/ProductService';
import { ref, onBeforeMount, onMounted, watch } from 'vue';
import { getUsers } from '../modules/users'
const open = ref(false)
const customer1 = ref(null);
const customer2 = ref(null);
const customer3 = ref(null);
const filters1 = ref(null);
const loading1 = ref(null);
const loading2 = ref(null);
const idFrozen = ref(false);
const products = ref(null);
const expandedRows = ref([]);
const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);
const representatives = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
]);

const customerService = new CustomerService();
const productService = new ProductService();


const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        country: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
};

const clearFilter1 = () => {
    initFilters1();
};
const expandAll = () => {
    expandedRows.value = products.value.filter((p) => p.id);
};
const collapseAll = () => {
    expandedRows.value = null;
};
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const formatDate = (value) => {
    const date = new Date(value)


    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
};
const calculateCustomerTotal = (name) => {
    let total = 0;
    if (customer3.value) {
        for (let customer of customer3.value) {
            if (customer.representative.name === name) {
                total++;
            }
        }
    }

    return total;
};

// Code added by Hadi

const filtered = ref([])
const users = ref([])

const preStatus = ref('all')
const role = ref('all')
const gender = ref('all')

onBeforeMount(() => {
    getUsers().then((allUsers) => {

        users.value = allUsers.data;
        filtered.value = allUsers.data;
        loading1.value = false;
        console.log(filtered.value);
    })


    initFilters1()
})

const update = () => {
    filtered.value = []

    if (preStatus.value === 'all' && role.value === 'all' && gender.value === 'all') {
        filtered.value = users.value;
        return;
    }
    users.value.map((user) => {
        let shouldAdded = false;
        const uGen = user.gender === 'male'? 'men' : 'women'
        const pStatus = user.preStatus.stat === 3? 'premium' : 'normal'
        if ((uGen === gender.value || gender.value === 'all') && (user.role === role.value || role.value === 'all') &&  (pStatus === preStatus.value || preStatus.value === 'all')) {
            filtered.value.push(user)
        }
    })
}

watch(preStatus, (value) => {
    update()
})
watch(role, (value) => {
    update()
})
watch(gender, (value) => {
    update()
})

</script>

<template>
    <div class="grid">
        <div class="col-12">

            <div class="card flex flex-wrap justify-content-center gap-4">
                <div class="flex align-items-center">
                    <RadioButton v-model="preStatus" inputId="ingredient1" name="pizza" value="normal" />
                    <label for="ingredient1" class="ml-2"> Normals </label>
                </div>
                <div class="flex align-items-center">
                    <RadioButton v-model="preStatus" inputId="ingredient2" name="pizza" value="premium" />
                    <label for="ingredient2" class="ml-2"> Premiums </label>
                </div>
                <div class="flex align-items-center">
                    <RadioButton v-model="preStatus" inputId="ingredient2" name="pizza" value="all" />
                    <label for="ingredient2" class="ml-2"> All </label>
                </div>

            </div>
            <div class="card flex flex-wrap justify-content-center gap-4">
                <div class="flex align-items-center">
                    <RadioButton v-model="role" inputId="ingredient1" name="pizza" value="athlete" />
                    <label for="ingredient1" class="ml-2"> Athletes </label>
                </div>
                <div class="flex align-items-center">
                    <RadioButton v-model="role" inputId="ingredient2" name="pizza" value="coach" />
                    <label for="ingredient2" class="ml-2"> Coaches </label>
                </div>
                <div class="flex align-items-center">
                    <RadioButton v-model="role" inputId="ingredient2" name="pizza" value="all" />
                    <label for="ingredient2" class="ml-2"> All </label>
                </div>
                
            </div>
            <div class="card flex flex-wrap justify-content-center gap-4">
                <div class="flex align-items-center">
                    <RadioButton v-model="gender" inputId="ingredient1" name="pizza" value="men" />
                    <label for="ingredient1" class="ml-2"> Men </label>
                </div>
                <div class="flex align-items-center">
                    <RadioButton v-model="gender" inputId="ingredient2" name="pizza" value="women" />
                    <label for="ingredient2" class="ml-2"> Women </label>
                </div>
                <div class="flex align-items-center">
                    <RadioButton v-model="gender" inputId="ingredient2" name="pizza" value="all" />
                    <label for="ingredient2" class="ml-2"> All </label>
                </div>
                
            </div>
            <div class="card">
                <h5>Users</h5>
                <DataTable :value="filtered" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
                    :rowHover="true" filterDisplay="menu" :loading="loading1" v-model:filters="filters1" :filters="filters1"
                    responsiveLayout="scroll"
                    :globalFilterFields="['name', 'country.name', 'representative.name', 'status']">
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Keyword Search"
                                    style="width: 100%" />
                            </span>
                        </div>
                    </template>
                    <template #empty> No customers found. </template>
                    <template #loading> Loading customers data. Please wait. </template>
                    <Column field="name" header="Name" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.name }} {{ data.lastName }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by name" />
                        </template>
                    </Column>
                    <Dialog v-model:open="open" header="Message" :style="{ width: '50vw' }">
                        <p> difudfhduhfudcbducubc </p>
                        <Button style="float: right;" label="Sent to Email" icon="pi pi-link" @click="open = true" />

                    </Dialog>
                    <Column header="Country" filterField="country" style="min-width: 12rem">
                        <template #body="{ data }">
                            <img :src="data.flagUrl" :alt="data.country" :class="'flag flag-' + data.country.code"
                                width="30" />
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.countryName
                            }}</span>
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by country" />
                        </template>
                        <template #filterclear="{ filterCallback }">
                            <Button type="button" icon="pi pi-times" @click="filterCallback()"
                                class="p-button-secondary"></Button>
                        </template>
                        <template #filterapply="{ filterCallback }">
                            <Button type="button" icon="pi pi-check" @click="filterCallback()"
                                class="p-button-success"></Button>
                        </template>
                    </Column>

                    <Column header="Date" filterField="date" dataType="date" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatDate(data.createdDate) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                        </template>
                    </Column>
                    <Column field="Premium" header="Premium" dataType="boolean" bodyClass="text-center"
                        style="min-width: 8rem">
                        <template #body="{ data }">
                            <span>{{ data.preStatus.data.text }}</span>
                        </template>
                        <template #filter="{ filterModel }">
                            <TriStateCheckbox v-model="filterModel.value" />
                        </template>
                    </Column>


                </DataTable>
            </div>
        </div>

        <!-- <div class="col-12">
            <div class="card ">
                <h5>Coach users</h5>
                <DataTable :value="products" v-model:expandedRows="expandedRows" dataKey="id" responsiveLayout="scroll">
                    
                    <template #header>
                        
                        <div>
                            <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 17%" />

                            <Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="mr-2 mb-2" />
                            <Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" class="mb-2" />
                        </div>
                    </template>
                    <Column :expander="true" headerStyle="min-width: 3rem" />

                    <Column field="name" header="Name" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column header="Country">
                        <template #body="slotProps">
                            <img :src="'demo/images/product/' + slotProps.data.image" :alt="slotProps.data.image" class="shadow-2" width="100" />
                        </template>
                    </Column>
                    <Column field="Date" header="Date" :sortable="true">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column field="gender" header="gender" :sortable="true">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.category) }}
                        </template></Column
                    >
                    <Column field="Score" header="Score" :sortable="true">
                        <template #body="slotProps">
                            <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                        </template>
                    </Column>
                    <Column field="Premium" header="Premium" dataType="boolean" bodyClass="text-center" style="min-width: 8rem">
                        <template #body="{ data }">
                            <i class="pi" :class="{ 'text-green-500 pi-check-circle': data.verified, 'text-pink-500 pi-times-circle': !data.verified }"></i>
                        </template>
                        <template #filter="{ filterModel }">
                            <TriStateCheckbox v-model="filterModel.value" />
                        </template>
                    </Column>
  
                   
                </DataTable>
            </div>
        </div> -->

    </div>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';

::v-deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
