<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import ProductService from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';
import { getOnlineUsers, getLogs, getMonthlyStatus } from '../modules/users'
const { isDarkTheme } = useLayout();

const products = ref(null);

const logs = ref([])

const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-minus' }
]);
const lineOptions = ref(null);
const productService = new ProductService();
const data = ref()

onMounted(async() => {
    console.log(getOnlineUsers);
    const result = await getOnlineUsers()

    console.log(result);
    products.value = result.data

    const result2 = await getLogs()

    console.log(result2);
    logs.value = result2.data;

    const result3 = await getMonthlyStatus((new Date()).getFullYear())
    data.value = result3.data;
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const applyLightTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
};

const applyDarkTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            }
        }
    };
};

watch(
    isDarkTheme,
    (val) => {
        if (val) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="grid">

        <div class="col-12 lg:col-6 xl:col-3" v-if="data !=null">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div class="text-3xl">

                        <span class="block text-500 font-medium mb-3">Users</span>
                        <br>
                        <div class="text-900 font-medium text-xl"> Month / {{ data[(new Date().getMonth() + 1)].allUsersCount }}</div>
                        <br>
                        <div class="text-900 font-medium text-xl">All / {{ data.allUsers }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center " style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-blue-500 text-xl text-8xl mr-6 mt-3 "></i>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3"  v-if="data !=null">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div class="text-3xl">
                        <span class="block text-500 font-medium mb-3">Vip-Users</span>
                        <br>
                        <div class="text-900 font-medium text-xl"> Month / {{ data[(new Date().getMonth() + 1)].premiumUsersCount }}</div>
                        <br>
                        <div class="text-900 font-medium text-xl">All / {{ data.premiumUsers }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-shield text-cyan-500 text-8xl mr-6 mt-3"></i>
                    </div>
                </div>

            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card">
                <div class="col-12 mb-2 lg:col-4 lg:mb-0 ">
                    <h5 class="">Online Users</h5>
                    <!-- 
                        <span class="p-input-icon-right float-left">
                            <InputText type="text" placeholder="Search" />
                            <i class="pi pi-search" />
                        </span> -->
                </div>
                <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
                    <Column style="width: 15%">
                        <template #header> Email </template>
                            <template #body="{data}">
                            {{data['email']}}
                        </template>
                    </Column>
                    <Column field="name" header="Name" :sortable="true" style="width: 35%">
                        <template #body="{data}">
                            {{data['name']}} {{ data['lastName'] }}
                        </template>
                    </Column>
                    <!-- <Column field="price" header="Price" :sortable="true" style="width: 35%">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column> -->
                    <Column style="width: 15%">
                        <template #header> ID </template>
                        <template #body="{data}">
                            {{data['_id']}}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <!--<div class="card">
                <div class="flex justify-content-between align-items-center mb-5">
                    <h5>Best Selling Products</h5>
                    <div>
                        <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu2.toggle($event)"></Button>
                        <Menu ref="menu2" :popup="true" :model="items"></Menu>
                    </div>
                </div>
                <ul class="list-none p-0 m-0">
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                        <div>
                            <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Space T-Shirt</span>
                            <div class="mt-1 text-600">Clothing</div>
                        </div>
                        <div class="mt-2 md:mt-0 flex align-items-center">
                            <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                                <div class="bg-orange-500 h-full" style="width: 50%"></div>
                            </div>
                            <span class="text-orange-500 ml-3 font-medium">%50</span>
                        </div>
                    </li>
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                        <div>
                            <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Portal Sticker</span>
                            <div class="mt-1 text-600">Accessories</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                            <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                                <div class="bg-cyan-500 h-full" style="width: 16%"></div>
                            </div>
                            <span class="text-cyan-500 ml-3 font-medium">%16</span>
                        </div>
                    </li>
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                        <div>
                            <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Supernova Sticker</span>
                            <div class="mt-1 text-600">Accessories</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                            <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                                <div class="bg-pink-500 h-full" style="width: 67%"></div>
                            </div>
                            <span class="text-pink-500 ml-3 font-medium">%67</span>
                        </div>
                    </li>
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                        <div>
                            <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Wonders Notebook</span>
                            <div class="mt-1 text-600">Office</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                            <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                                <div class="bg-green-500 h-full" style="width: 35%"></div>
                            </div>
                            <span class="text-green-500 ml-3 font-medium">%35</span>
                        </div>
                    </li>
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                        <div>
                            <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Mat Black Case</span>
                            <div class="mt-1 text-600">Accessories</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                            <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                                <div class="bg-purple-500 h-full" style="width: 75%"></div>
                            </div>
                            <span class="text-purple-500 ml-3 font-medium">%75</span>
                        </div>
                    </li>
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                        <div>
                            <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Robots T-Shirt</span>
                            <div class="mt-1 text-600">Clothing</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                            <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                                <div class="bg-teal-500 h-full" style="width: 40%"></div>
                            </div>
                            <span class="text-teal-500 ml-3 font-medium">%40</span>
                        </div>
                    </li>
                </ul>
            </div> -->
        </div>
        <div class="col-12 xl:col-6">

            <div class="card h-">
                <div class="flex align-items-center justify-content-between mb-4">
                    <h5>Notifications</h5>
                </div>
                <!-- <span class="block text-600 font-medium mb-3">TODAY</span> -->
                <ul class="p-0 mx-0 mt-0 mb-4 list-none overflow-y-scroll">
                    <li class="flex align-items-center py-2 border-bottom-1 surface-border" v-for="log in logs">
                        <div
                            class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <i class="pi pi-bell text-xl text-blue-500"></i>
                        </div>
                        <span class="text-900 line-height-3">{{ log.name }}
                            <span class="text-700">{{ log.task }}</span>
                        </span>
                    </li>
                </ul>
        </div>

    </div>
</div></template>
