<template>
<div v-for="message in messages"  class="card ">
    <div  class=" flex align-items-center py-2">
                        <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <i class="pi pi-comment text-xl text-blue-500"></i>
                        </div>
                        
                        <span class="text-900 line-height-3 "
                            >{{ message.name }}
                            <span  class="text-700 "><a  >{{ message.email }}</a></span>
                        </span>

</div>                     
  <Button style="float: right;" label="Show" icon="pi pi-external-link" @click="visible = true" />
<Dialog v-model:visible="visible"   header="Message" :style="{ width: '50vw' }">
 <p>   {{ message.text }} </p>  
 <Button style="float: right;" label="Sent to Email" icon="pi pi-link" @click="visible = true" />

</Dialog>
</div>


</template>

<script setup>
import {ref} from 'vue'

const messages = ref([
{name:"mamad",email:'aligarivani84@gmail.com@gmail.com',text:'ectetur adipisicing elit. Nisi dignissimos necessitatibus dolor, quaerat omnis numquam ducimus voluptate quidem. Ab eligendi repellat dolorum minus libero itaque, veniam ipsam in provident quia.'},
{name:"ahmad",email:'kdbnu@gmail.com',text:' Rem inventore incidunt optio aliquam eveniet. Voluptates placeat enim necessitatibus, perspiciatis, eos laboriosam doloribus libero repellendus facilis accusantium numquam nihil molestiae non!'},
{name:"Ali",email:'kdnubcudbnu@gmail.com',text:'sit amet, consectetur adipisicing elit. Rem inventore incidunt optio aliquam eveniet. Voluptates placeat enim necessitatibus, perspiciatis, eos laboriosam dolorimqua'},
{name:"Ali",email:'kdnubcudbnu@gmail.com',text:'sit amet, consectetur adipisicing elit. Rem inventore incidunt optio aliquam eveniet. Voluptates placeat enim necessitatibus, perspiciatis, eos laboriosam dolorimqua'},
{name:"Ali",email:'kdnubcudbnu@gmail.com',text:'sit amet, consectetur adipisicing elit. Rem inventore incidunt optio aliquam eveniet. Voluptates placeat enim necessitatibus, perspiciatis, eos laboriosam dolorimqua'},
{name:"Ali",email:'kdnubcudbnu@gmail.com',text:'sit amet, consectetur adipisicing elit. Rem inventore incidunt optio aliquam eveniet. Voluptates placeat enim necessitatibus, perspiciatis, eos laboriosam dolorimqua'},
{name:"Ali",email:'kdnubcudbnu@gmail.com',text:'sit amet, consectetur adipisicing elit. Rem inventore incidunt optio aliquam eveniet. Voluptates placeat enim necessitatibus, perspiciatis, eos laboriosam dolorimqua'},
{name:"Ali",email:'kdnubcudbnu@gmail.com',text:'sit amet, consectetur adipisicing elit. Rem inventore incidunt optio aliquam eveniet. Voluptates placeat enim necessitatibus, perspiciatis, eos laboriosam dolorimqua'},



])
const visible = ref(false);

</script>