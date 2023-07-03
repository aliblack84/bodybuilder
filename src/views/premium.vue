<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import CustomerService from '../service/CustomerService';
import ProductService from '../service/ProductService';
import { ref, onBeforeMount } from 'vue'; import { useToast } from 'primevue/usetoast';
import { getNotVerified, acceptVerification, getRejected, rejectVerification, getAllAccepted } from '../modules/premium'

const customer1 = ref<any>(null);
const customer2 = ref<any>(null);
const customer3 = ref<any>(null);
const filters1 = ref<any>(null);
const loading1 = ref(true);
const loading2 = ref(true);
const loading3 = ref(true);
const idFrozen = ref(false);
const products = ref<any>(null);
const expandedRows = ref<any>([]);
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
const toast = useToast();
const customerService = new CustomerService();
const productService = new ProductService();

onBeforeMount(async () => {
    productService.getProductsWithOrdersSmall().then((data) => (products.value = data));
    // customerService.getCustomersLarge().then((data) => {
    //     customer1.value = data;
    //     loading1.value = false;
    //     console.log(data);
    //     customer1.value.forEach((customer) => (customer.date = new Date(customer.date)));
    // });
    // customerService.getCustomersLarge().then((data) => (customer2.value = data));
    // customerService.getCustomersMedium().then((data) => (customer3.value = data));
    initFilters1();

    
        await updateData();
});

const updateData = async () => {
    const result = await getNotVerified();
    loading1.value = false;

    if (result.status === 201) {
        console.log(result.data);
        customer1.value = result.data
    }

    const result2 = await getRejected()
    loading2.value = false;

    if (result2.status === 201) {
        console.log(result.data);
        customer2.value = result2.data;
    }

    const result3 = await getAllAccepted();
    loading3.value = false;

    if (result3.status === 201) {
        console.log(result.data);
        customer3.value = result3.data;
    }
}

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
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
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
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

const verifyVer = async (reqId: string) => {
    const accResult = await acceptVerification(reqId)

    if (accResult.status == 201) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Verified', life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'An error occured', life: 3000 });
    }

    await updateData()
}

const reject = async (reqId: string) => {
    const accResult = await rejectVerification(reqId)

    if (accResult.status == 201) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Rejected', life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'An error occured', life: 3000 });
    }

    await updateData();
}

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <Toast />
            <div class="card">
                <h5>Requests</h5>
                <DataTable :value="customer1" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
                    :rowHover="true" v-model:filters="filters1" filterDisplay="menu" :loading="loading1" :filters="filters1"
                    responsiveLayout="scroll"
                    :globalFilterFields="['email', 'country.name', 'representative.name', 'status']">
                    <!-- <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%" />
                            </span>
                        </div>
                    </template> -->
                    <template #empty> No customers found. </template>
                    <template #loading> Loading customers data. Please wait. </template>
                    <Column field="email" header="Email" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.email }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by name" />
                        </template>
                    </Column>
                    <Column header="Receipt code" filterField="date" dataType="date" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ data.receiptCode }}
                        </template>
                    </Column>


                    <Column field="Premium" header="Premium" dataType="boolean" bodyClass="text-center"
                        style="min-width: 8rem">
                        <template #body="{ data }">
                            <Button icon="pi pi-check" class="p-button-rounded p-button-success mr-2 mb-2"
                                @click="verifyVer(data['_id'])" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2 mb-2" @click="reject(data['_id'])" />

                        </template>
                    </Column>


                </DataTable>
            </div>
        </div>
        <div class="col-12">
            <Toast />
            <div class="card">
                <h5>Rejected requests</h5>
                <DataTable :value="customer2" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
                    :rowHover="true" v-model:filters="filters2" filterDisplay="menu" :loading="loading2" :filters="filters2"
                    responsiveLayout="scroll"
                    :globalFilterFields="['email', 'country.name', 'representative.name', 'status']">
                    <!-- <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%" />
                            </span>
                        </div>
                    </template> -->
                    <template #empty> No customers found. </template>
                    <template #loading> Loading customers data. Please wait. </template>
                    <Column field="email" header="Email" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.email }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by name" />
                        </template>
                    </Column>
                    <Column header="Receipt code" filterField="date" dataType="date" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ data.receiptCode }}
                        </template>
                    </Column>


                    <Column field="Premium" header="Premium" dataType="boolean" bodyClass="text-center"
                        style="min-width: 8rem">
                        <template #body="{ data }">
                            <Button icon="pi pi-check" class="p-button-rounded p-button-success mr-2 mb-2"
                                @click="verifyVer(data['_id'])" />
                        </template>
                    </Column>


                </DataTable>
            </div>
        </div>
        <div class="col-12">
            <Toast />
            <div class="card">
                <h5>Accepted requests</h5>
                <DataTable :value="customer3" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
                    :rowHover="true" v-model:filters="filters3" filterDisplay="menu" :loading="loading3" :filters="filters3"
                    responsiveLayout="scroll"
                    :globalFilterFields="['email', 'country.name', 'representative.name', 'status']">
                    <!-- <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%" />
                            </span>
                        </div>
                    </template> -->
                    <template #empty> No customers found. </template>
                    <template #loading> Loading customers data. Please wait. </template>
                    <Column field="email" header="Email" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.email }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by name" />
                        </template>
                    </Column>
                    <Column header="Receipt code" filterField="date" dataType="date" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ data.receiptCode }}
                        </template>
                    </Column>


                    <Column field="Premium" header="Premium" dataType="boolean" bodyClass="text-center"
                        style="min-width: 8rem">
                        <template #body="{ data }">
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2 mb-2"
                                @click="reject(data['_id'])" />
                        </template>
                    </Column>


                </DataTable>
            </div>
        </div>
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
