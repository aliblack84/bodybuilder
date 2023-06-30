<script setup>
import {ref} from 'vue'
import { useToast } from 'primevue/usetoast';
const dropdownValues = ref([
    { name: 'بالا تنه', code: '' },
    { name: 'پایین تنه', code: '' },
    { name: '', code: '' },
    { name: '', code: '' },
    { name: '', code: '' }
]);
const floatValue = ref(null);
const floatValue_1 = ref(null);
const Ctegory = ref(null)
const toast = useToast();

const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};
</script>

<template>
     
    <div class="grid mt- ">
       
        <div class="col-8 m-auto ">
            <div class="card ">
                <span class="p-float-label">
                    <InputText class="w-8" id="username" type="text" v-model="floatValue" />
                    <label  for="username">Animation name</label>
                </span>
                <br>
<Textarea class="w-8" placeholder="About animation" :autoResize="true" rows="3" cols="30" />

<br>     
            

                <br>
                <Dropdown class="w-8" v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select Category" />

<br>
<br>

                <FileUpload name="demo[]" @uploader="onUpload" :multiple="true" accept="image/*" :maxFileSize="1000000" customUpload />

          

            </div>
            <div class="card ">
                <h2>Create Category</h2>
                <br>
                <span class="p-float-label">
                    <InputText class="w-8" id="username" type="text" v-model="Ctegory" />
                    <label  for="username">Category Name</label>
                </span>
                <br>

<br>
<h3>ctegory image</h3>
                <FileUpload name="demo[]" @uploader="onUpload" :multiple="true" accept="image/*" :maxFileSize="1000000" customUpload />

          

            </div>
        </div>
    </div>
</template>
