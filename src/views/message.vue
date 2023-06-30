<template>
<div v-for="message in messages" class="card">
    <li  class="flex align-items-center py-2 ">
                        <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <i class="pi pi-comment text-xl text-blue-500"></i>
                        </div>
                        <span class="text-900 line-height-3"
                            >{{ message.name }}
                            <span  class="text-700 "><a  :href="message.email">{{ message.email }}</a></span>
                        </span>
                    </li>
</div>
</template>



<script setup>
import {ref} from 'vue'
const messages = ref([

{name:"Ali",email:'kdnubcudbnu@gmail.com'},
{name:"mamad",email:'aligarivani84@gmail.com@gmail.com'},
])

</script>