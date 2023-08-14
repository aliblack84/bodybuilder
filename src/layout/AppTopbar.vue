<script setup>
import { ref, computed, onMounted, onBeforeUnmount, onBeforeMount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import { getAdminStaff } from '../modules/logs'
const { layoutConfig, onMenuToggle } = useLayout();
const outsideClickListener = ref(null);
import { FilterMatchMode, FilterOperator } from 'primevue/api';
const topbarMenuActive = ref(false);
const date = ref('');
const router = useRouter();
const password = ref(false);
const visible = ref(false);
const nodes = ref([
]);

const logs = ref([])

onBeforeMount(() => {
    initFilters1()
})

onMounted(async () => {
    const result = await getAdminStaff()
    console.log(result);

    logs.value = result.data;
    const now = new Date()
    date.value = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`
    bindOutsideClickListener();

});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});


const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const onSettingsClick = () => {
    topbarMenuActive.value = false;
    router.push('/documentation');
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};

const filters1 = ref(null)

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        task: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    };
    console.log(filters1.value);
};

const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>Admin</span>

        </router-link>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">


            <Dialog v-model:password="password" modal :style="{ width: '50vw' }">
                <h2>password</h2>
                <InputText type="text" v-model="value" />
            </Dialog>



            <p style="font-size: x-large;margin: auto; margin-right: 20px;">{{ date }}</p>
            <Button icon="pi pi-user" @click="visible = true" />
            <Dialog v-model:visible="visible" modal :style="{ width: '50vw' }">

                <!-- <table style="margin: auto;width: 70%;" border="1">
<tr style="margin: auto;">
    <td>Work</td>   <td>Date</td>
    
</tr>
<tr v-for="text in texts">
    <td>{{ text.work }}</td> <td>{{ text.date }}</td>
</tr>
 </table>
 <br>
 <br> -->
                <div class="card">
                    <DataTable :value="logs" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]" v-model:filters="filters1" :filters="filters1" 
                    :globalFilterFields="['task', 'country.name', 'representative.name', 'status']">
                        <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Keyword Search"
                                    style="width: 100%" />
                            </span>
                        </div>
                    </template>
                        <Column field="task" header="Task" expander>
                            <template #body="{ data }">
                                {{ data.task }}
                            </template>
                        </Column>
                        <Column field="createdDate" header="Date"></Column>
                    </DataTable>
                </div>
            </Dialog>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
