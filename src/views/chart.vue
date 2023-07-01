<template>
    <Button label="Print" icon="pi pi-print" style="width: 110px;  " />
    <hr>
        <div class="grid p-fluid " >

    <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div class="text-3xl">
            
                        <span class="block text-500 font-medium mb-3">Online</span>
                        <br>
              <div class="text-900 font-medium text-5xl">  500</div>
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
              <div class="text-900 font-medium text-5xl">2000</div>
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
              <div class="text-900 font-medium text-5xl">20</div>
              <br>
                        <div class="text-900 font-medium text-xl"></div>
                    </div>
                    <div class="flex align-items-center justify-content-center " style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-delete-left  text-red-500 text-xl text-8xl mr-6 mt-3 "></i>
                    </div>
                </div>
              
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div class="text-3xl">
            
                        <span class="block text-500 font-medium mb-3">Limited</span>
                        <br>
              <div class="text-900 font-medium text-5xl">10</div>
              <br>
                        <div class="text-900 font-medium text-xl"></div>
                    </div>
                    <div class="flex align-items-center justify-content-center " style="width: 2.5rem; height: 2.5rem">
                        <i class=" pi pi-unlock text-yellow-500 text-xl text-8xl mr-6 mt-3 "></i>
                    </div>
                </div>
              
            </div>
        </div>    
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div class="text-3xl">
            
                        <span class="block text-500 font-medium mb-3">Blocked</span>
                        <br>
              <div class="text-900 font-medium text-5xl">18</div>
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
              <div class="text-900 font-medium text-5xl">68</div>
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
          <Chart type="bar"  :data="chartData" :options="chartOptions" class="h-30rem" />

      </div>
        
    <div class="card col-12 xl:col-6 w-full " >
            <Chart  type="bar" :data="lineData" :options="lineOptions" />
        </div>
 
</template>

<script setup>
import { reactive,ref,onMounted } from 'vue'


onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();
        
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

























const lineData = reactive({
    labels: ['Man / Woman', 'Coach / Users', 'Premium / Normal',],
    datasets: [
        {
            label: 'Dark Blue',
            data: [240, 300, 100, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Light Green',
            data: [190, 200, 310, 19, 86, 27, 100],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
});


</script>