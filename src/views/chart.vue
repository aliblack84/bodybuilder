<template>
    <Button label="Print" @click="printAll()" icon="pi pi-print" style="width: 110px;  " />
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
        <h3>Now Year Data</h3>
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" />

    </div>

    <!-- <div class="card col-12 xl:col-6 w-full ">
        <Chart type="bar" :data="lineData" :options="lineOptions" />
    </div> -->
    <div class="background">
    <div class="small-chart-container"><Chart type="pie" :data="data" :options="options" /></div>

</div>
<br>
<div class="cart">
    <Chart type="bar" :data="barChartData" :options="barChartOptions" class="h-30rem"  />
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { getUsersData, getMonthlyStatus } from '../modules/users'

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
const chartData1 = ref(null)
const chartData2 = ref ()
const printAll = () => {
    print()
}

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

    const result2 = await getMonthlyStatus(2023)

    console.log(result2);
    chartData1.value = result2.data;
    console.log(Object.keys(chartData1.value));
    chartData.value = setChartData()
});


const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    if (chartData1.value === null) return {}
    return {
        labels: Object.keys(chartData1.value),
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
                data: [chartData1.value['1'].manUsersCount, chartData1.value['2'].manUsersCount, chartData1.value['3'].womanUsersCount, chartData1.value['4'].womanUsersCount, chartData1.value['5'].womanUsersCount, chartData1.value['6'].womanUsersCount, chartData1.value['7'].womanUsersCount,
                chartData1.value['8'].womanUsersCount, chartData1.value['9'].womanUsersCount, chartData1.value['10'].womanUsersCount, chartData1.value['11'].womanUsersCount, chartData1.value['12'].womanUsersCount],
                borderColor: 'white',
                borderWidth: 2
            },
            {
                type: 'bar',
                label: 'man',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                data: [chartData1.value['1'].manUsersCount, chartData1.value['2'].manUsersCount, chartData1.value['3'].manUsersCount, chartData1.value['4'].manUsersCount, chartData1.value['5'].manUsersCount, chartData1.value['6'].manUsersCount, chartData1.value['7'].manUsersCount,
                chartData1.value['8'].manUsersCount, chartData1.value['9'].manUsersCount, chartData1.value['10'].manUsersCount, chartData1.value['11'].manUsersCount, chartData1.value['12'].manUsersCount],
                borderColor: 'white',
                borderWidth: 2
            },
            {
                type: 'bar',
                label: 'premium',
                backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                data: [chartData1.value['1'].premiumUsersCount, chartData1.value['2'].premiumUsersCount, chartData1.value['3'].premiumUsersCount, chartData1.value['4'].premiumUsersCount, chartData1.value['5'].premiumUsersCount, chartData1.value['6'].premiumUsersCount, chartData1.value['7'].premiumUsersCount,
                chartData1.value['8'].premiumUsersCount, chartData1.value['9'].premiumUsersCount, chartData1.value['10'].premiumUsersCount, chartData1.value['11'].premiumUsersCount, chartData1.value['12'].premiumUsersCount],
            },
            {
                type: 'bar',
                label: 'normal',
                backgroundColor: documentStyle.getPropertyValue('--gray-500'),
                data: [chartData1.value['1'].normalUsersCount, chartData1.value['2'].normalUsersCount, chartData1.value['3'].normalUsersCount, chartData1.value['4'].normalUsersCount, chartData1.value['5'].normalUsersCount, chartData1.value['6'].normalUsersCount, chartData1.value['7'].normalUsersCount,
                chartData1.value['8'].normalUsersCount, chartData1.value['9'].normalUsersCount, chartData1.value['10'].normalUsersCount, chartData1.value['11'].normalUsersCount, chartData1.value['12'].normalUsersCount],

            },
/*add role*/

            {
                type: 'bar',
                label: 'athlete',
                backgroundColor: documentStyle.getPropertyValue('--red-500'),
                data: [chartData1.value['1'].premiumUsersCount, chartData1.value['2'].premiumUsersCount, chartData1.value['3'].premiumUsersCount, chartData1.value['4'].premiumUsersCount, chartData1.value['5'].premiumUsersCount, chartData1.value['6'].premiumUsersCount, chartData1.value['7'].premiumUsersCount,
                chartData1.value['8'].premiumUsersCount, chartData1.value['9'].premiumUsersCount, chartData1.value['10'].premiumUsersCount, chartData1.value['11'].premiumUsersCount, chartData1.value['12'].premiumUsersCount],
            },
            {
                type: 'bar',
                label: 'coach',
                backgroundColor: documentStyle.getPropertyValue('--purple-500'),
                data: [chartData1.value['1'].normalUsersCount, chartData1.value['2'].normalUsersCount, chartData1.value['3'].normalUsersCount, chartData1.value['4'].normalUsersCount, chartData1.value['5'].normalUsersCount, chartData1.value['6'].normalUsersCount, chartData1.value['7'].normalUsersCount,
                chartData1.value['8'].normalUsersCount, chartData1.value['9'].normalUsersCount, chartData1.value['10'].normalUsersCount, chartData1.value['11'].normalUsersCount, chartData1.value['12'].normalUsersCount],

            },


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


const data = ref();
const options = ref({
    plugins: {
        legend: {
            labels: {
                usePointStyle: true
            }
        }
    }
});

// Run onMounted logic
onMounted(() => {
    data.value = generateChartData();
});

// Define function to generate chart data
const generateChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ['IRAN', 'US/CANADA', 'United Kingdom','Russia','Brazil','AU/NZ','Other (Asia)',
        'Other (Europe)','Other (Latin America)','Other (Africa)'],
        datasets: [
            {
                data: [40, 25, 100,50,85,45,66,12,88,14],
                backgroundColor: [
                getComputedStyle(document.documentElement).getPropertyValue('--blue-500'),
  getComputedStyle(document.documentElement).getPropertyValue('--yellow-500'),
  getComputedStyle(document.documentElement).getPropertyValue('--green-500'),
  getComputedStyle(document.documentElement).getPropertyValue('--purple-500'),
  getComputedStyle(document.documentElement).getPropertyValue('--orange-500'),
  getComputedStyle(document.documentElement).getPropertyValue('--red-500'),
  getComputedStyle(document.documentElement).getPropertyValue('--teal-500'),
  getComputedStyle(document.documentElement).getPropertyValue('--pink-500'),
  getComputedStyle(document.documentElement).getPropertyValue('--indigo-500'),
  getComputedStyle(document.documentElement).getPropertyValue('--cyan-500'),
  getComputedStyle(document.documentElement).getPropertyValue('--brown-500'),
  getComputedStyle(document.documentElement).getPropertyValue('--lime-500'),documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'),],
                hoverBackgroundColor: [
                    
                getComputedStyle(document.documentElement).getPropertyValue('--blue-400'),
  getComputedStyle(document.documentElement).getPropertyValue('--yellow-400'),
  getComputedStyle(document.documentElement).getPropertyValue('--green-400'),
  getComputedStyle(document.documentElement).getPropertyValue('--purple-400'),
  getComputedStyle(document.documentElement).getPropertyValue('--orange-400'),
  getComputedStyle(document.documentElement).getPropertyValue('--red-400'),
  getComputedStyle(document.documentElement).getPropertyValue('--teal-400'),
  getComputedStyle(document.documentElement).getPropertyValue('--pink-400'),
  getComputedStyle(document.documentElement).getPropertyValue('--indigo-400'),
  getComputedStyle(document.documentElement).getPropertyValue('--cyan-400'),
  getComputedStyle(document.documentElement).getPropertyValue('--brown-400'),
  getComputedStyle(document.documentElement).getPropertyValue('--lime-400'),documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'),]
            
            
            }
        ]
    };
};


onMounted(() => {
    barChartData.value = setBarChartData();
    barChartOptions.value = setBarChartOptions();
});

const barChartData = ref();
const barChartOptions = ref();

const setBarChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: [' 17 - 25','25 - 30','30 - 40','40+' ],
        datasets: [
            {
                label: 'age',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data: [65, 59, 80, 81,]
            },
 
        ]
    };
};
const setBarChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

/* 
    17 - 25
    25 - 30
    30 - 40
    40+
*/

</script>
<style>
.small-chart-container {
    margin: auto;
    padding: 50px;
  width: 55%; /* Adjust the width as needed */
  height: 60%; /* Adjust the height as needed */
  /* Additional styling properties as needed */
}
.background{
    background-color: white;
border-radius: 10px;
display: flex;
}
.cart{
    width: auto;
    background-color: white;
    border-radius: 10px;

}
@media screen and (max-width: 1600px) {
  .small-chart-container {
    padding: 30px;
    width: 70%; 

  }
  }
  @media screen and (max-width: 700px) {
  .small-chart-container {
    padding: 30px;
    width:100%; 

  }
  }
</style>