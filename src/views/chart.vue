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
        <div class="col-12 lg:col-6 xl:col-3">

        
        </div>
        
        <div class="card col-12 xl:col-6 " >
            <Chart  type="bar" :data="lineData" :options="lineOptions" />
        </div>
        <div class="card col-12 xl:col-6 ">
          <Chart type="line" :data="usersinmonth" :options="lineOptions" />
      </div>
 
    
    </div>
</template>

<script setup>
import { reactive } from 'vue'
const lineData = reactive({
    labels: ['Man / Woman', 'Coach / Users', 'Premium / Normal',],
    datasets: [
        {
            label: 'Dark Blue',
            data: [2340, 300, 100, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Light Green',
            data: [1890, 2000, 3100, 19, 86, 27, 100],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
});
const usersinmonth = reactive({
    labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
        {
            label: 'Premium',
            data: [0, 14, 24, 20, 110, 100],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Normal',
            data: [30, 50, 200, 420, 410, 419],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
});
</script>