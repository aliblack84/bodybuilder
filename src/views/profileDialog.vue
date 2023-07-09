
<script setup> 
import Dialog from 'primevue/dialog';

import { ref } from 'vue';
const visible = ref(false);
const checked = ref (false);
const user = ref (false);

</script>
<template>
  <Button style="" label="Show" icon="pi pi-external-link" @click="visible = true" />
<Dialog v-model:visible="visible" style="padding: 10px"   :style="{ width: '70vw' , }">
    <div style="text-align: center;">
    <img style="height: 150px; width: 150px;border-radius: 100%;" src="../assets/demo/styles/flags/flags_responsive.png" alt="">
    <h2>user-name</h2>
 
</div>

<div> 

    <h2>basic information</h2>

    <br>
    <div class="card">
    <h2 class="flex">Country  <img class="ml-4" src="#" alt=""></h2>
    <br>  
<br>
<div style="display:flex ;justify-content: space-between; ">

<h2 >man   or   woman</h2>

<h2 >coach   or   user</h2>

<h2>Premium {{ checked }}</h2>
</div>  


    <h2 class="flex">Email Address   <p class="ml-4 " style="color:gray;" >aliblack84@gmail.com</p></h2>
<br>
<h2 class="flex">Password  <p class="ml-4 " style="color:gray;" >********</p></h2>


</div>
    </div>
    
    <br>
    <br>
    <div> 

<h2 style="">Settings</h2>

<br>
<div class="card">


<br>    

<hr>
<div class="flex" style="justify-content: space-between;"><h2>premium</h2><InputSwitch style="height: 28px; width: 50px;" class="m-2" v-model="checked" />
</div><hr>



<div class="flex" style="justify-content: space-between;"><h2>coach or user</h2><InputSwitch style="height: 28px; width: 50px;" class="m-2" v-model="user" />
</div><hr>

<div class="flex" style="justify-content: space-between;"><h2>Change password</h2>    <Button label="CLick to change!" severity="secondary" />

</div><hr>
<div style="display: flex ; justify-content: space-between;">
    <Button label="Notice"  icon="pi pi-comment" raised />
    <Button label="Block Account" severity="secondary" />

<Button label="Limite Account" severity="warning" />
    <Button label="Delete Account" severity="danger" />
 
</div>

</div>
</div>

</Dialog>
</template>
