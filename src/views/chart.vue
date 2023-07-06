<template>
    <Button label="Print" icon="pi pi-print" style="width: 110px;  " />
    <hr>
    <div class="grid p-fluid ">

        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div class="text-3xl">

                        <span class="block text-500 font-medium mb-3">Online</span>
                        <br>
                        <div class="text-900 font-medium text-5xl">{{ onlineUsers }}</div>
                        <br>
                        <div class="text-900 font-medium text-xl"></div>
                    </div>
                    <div class="flex align-items-center justify-content-center " style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-eye text-green-500 text-xl text-8xl mr-6 mt-3 "></i>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div class="text-3xl">

                        <span class="block text-500 font-medium mb-3">Offline</span>
                        <br>
                        <div class="text-900 font-medium text-5xl">{{ offlineUsers }}</div>
                        <br>
                        <div class="text-900 font-medium text-xl"></div>
                    </div>
                    <div class="flex align-items-center justify-content-center " style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-eye-slash  text-red-500 text-xl text-8xl mr-6 mt-3 "></i>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div class="text-3xl">

                        <span class="block text-500 font-medium mb-3">Deleted</span>
                        <br>
                        <div class="text-900 font-medium text-5xl">{{ deletedUsers }}</div>
                        <br>
                        <div class="text-900 font-medium text-xl"></div>
                    </div>
                    <div class="flex align-items-center justify-content-center " style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-delete-left  text-red-500 text-xl text-8xl mr-6 mt-3 "></i>
                    </div>
                </div>

            </div>
        </div>
        <!-- <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div class="text-3xl">
            
                        <span class="block text-500 font-medium mb-3">Limited</span>
                        <br>
              <div class="text-900 font-medium text-5xl">{{ limt }}</div>
              <br>
                        <div class="text-900 font-medium text-xl"></div>
                    </div>
                    <div class="flex align-items-center justify-content-center " style="width: 2.5rem; height: 2.5rem">
                        <i class=" pi pi-unlock text-yellow-500 text-xl text-8xl mr-6 mt-3 "></i>
                    </div>
                </div>
              
            </div>
        </div>     -->
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div class="text-3xl">

                        <span class="block text-500 font-medium mb-3">Blocked</span>
                        <br>
                        <div class="text-900 font-medium text-5xl">{{ blockedUsers }}</div>
                        <br>

                    </div>
                    <div class="flex align-items-center justify-content-center " style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-lock text-red-500 text-xl text-8xl mr-6 mt-3 "></i>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div class="text-3xl">

                        <span class="block text-500 font-medium mb-3">Animations</span>
                        <br>
                        <div class="text-900 font-medium text-5xl">{{ animationsCount }}</div>
                        <br>

                    </div>
                    <div class="flex align-items-center justify-content-center " style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-images text-blue-500 text-xl text-8xl mr-6 mt-3 "></i>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
        </div>



    </div>
    <div class="card col-12 xl:col-6 w-full ">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" />

    </div>

    <div class="card col-12 xl:col-6 w-full ">
        <Chart type="bar" :data="lineData" :options="lineOptions" />
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { getUsersData } from '../modules/users'

const chartData = ref();
const chartOptions = ref();

const onlineUsers = ref(0);
const offlineUsers = ref(0);
const blockedUsers = ref(0);
const deletedUsers = ref(0);
const animationsCount = ref(0);
const manUsers = ref(0);
const womanUsers = ref(0);
const premiumUsers = ref(0)
const normalUsers = ref(0)
const coachUsers = ref(0)
const athleteUsers = ref(0)

onMounted(async () => {
    const result = await getUsersData();
    if (result.status === 201) {
        onlineUsers.value = result.data.data['onlineUsers']
        offlineUsers.value = result.data.data['offlineUsers']
        blockedUsers.value = result.data.data['blockedUsers']
        deletedUsers.value = result.data.data['deletedUsers']
        animationsCount.value = result.data.data['animationsCount']
        manUsers.value = result.data.data.genderData.man
        womanUsers.value = result.data.data['genderData']['woman']
        premiumUsers.value = result.data.data['subscriptionData']['premium']
        normalUsers.value = result.data.data['subscriptionData']['normal']
        coachUsers.value = result.data.data.roleData.coach
        athleteUsers.value = result.data.data.roleData.athletes
    }
    chartData.value = setChartData();
    lineData.value = {
        labels: ['Man / Woman', 'Coach / Users', 'Premium / Normal',],
        datasets: [
            {
                label: 'Dark Blue',
                data: [manUsers.value, coachUsers.value, premiumUsers.value, 0, 0, 0, 0],
                fill: false,
                backgroundColor: '#2f4860',
                borderColor: '#2f4860',
                tension: 0.4
            },
            {
                label: 'Light Green',
                data: [womanUsers.value, athleteUsers.value, normalUsers.value, 0, 0, 0, 0],
                fill: false,
                backgroundColor: '#00bb7e',
                borderColor: '#00bb7e',
                tension: 0.4
            }
        ]
    };
    chartOptions.value = setChartOptions();
});


const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            // {
            //     type: 'line',
            //     label: 'man',
            //     borderColor: documentStyle.getPropertyValue('--blue-500'),
            //     borderWidth: 2,
            //     fill: false,
            //     tension: 0.4,
            //     data: [50, 25, 12, 48, 56, 76, 42]
            // },
            {
                type: 'bar',
                label: 'woman',
                backgroundColor: documentStyle.getPropertyValue('--green-500'),
                data: [21, 84, 24, 64, 37, 65, 34],
                borderColor: 'white',
                borderWidth: 2
            },
            {
                type: 'bar',
                label: 'man',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                data: [21, 84, 24, 35, 37, 65, 34],
                borderColor: 'white',
                borderWidth: 2
            },
            {
                type: 'bar',
                label: 'coach',
                backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                data: [41, 52, 24, 64, 23, 21, 32]
            },
            {
                type: 'bar',
                label: 'users',
                backgroundColor: documentStyle.getPropertyValue('--gray-500'),
                data: [41, 52, 24, 58, 23, 21, 32]
            }


        ]

    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}









const lineData = ref({
    labels: ['Man / Woman', 'Coach / Users', 'Premium / Normal',],
    datasets: [
        {
            label: 'Dark Blue',
            data: [manUsers.value, 0, 0, 0, 0, 0, 0],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Light Green',
            data: [womanUsers.value, 0, 0, 0, 0, 0, 0],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
});


</script>