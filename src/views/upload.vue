<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useToast } from 'primevue/usetoast';
import { getAllCategories, createCategory, createMovement } from '../modules/animation'
import axios from 'axios';
import { getUrl } from '../modules/universal';
const dropdownValues = ref([
]);
const movementName = ref(null);
const movementDescription = ref(null);
const categoryName = ref('')
const toast = useToast();
const dropdownValue = ref<any>()
const file = ref();

onBeforeMount(async () => {
    await updateData()
})

const updateData = async () => {
    const result1 = await getAllCategories();

    if (result1.status === 201) {
        dropdownValues.value = result1.data;
    }
}

const onUpload = (fileOp) => {
    file.value = fileOp.target.files[0]

    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

const createCategoryC = async () => {
    const result = await createCategory(categoryName.value);
    console.log(result.status);

    if (result.status === 201) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Category Created', life: 3000 });
    }

    await updateData()
}

const createMovementM = async () => {
    console.log(movementName.value);
    console.log(movementDescription.value);
    console.log(dropdownValue.value);
    let error = false;
    if (movementName.value === '' || movementName.value === null) {
        toast.add({ severity: 'error', summary: 'Invalid', detail: 'Movement name shouldn\'t be empty', life: 3000 });
        error = true;
    }
    if (movementDescription.value === '' || movementDescription.value === null) {
        toast.add({ severity: 'error', summary: 'Invalid', detail: 'Movement description shouldn\'t be empty', life: 3000 });
        error = true;
    }
    if (dropdownValue.value == null) {
        toast.add({ severity: 'error', summary: 'Invalid', detail: 'Movement category shouldn\'t be empty', life: 3000 });
        error = true;
    }
    console.log(file.value);
    if (error) return;
    const formData = new FormData()

    formData.append('file', file.value)

    try {
        const result1 = await axios.post(getUrl('/upload'), formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToeken')}`
            }
        })

        if (result1.status === 201) {
            const result2 = await createMovement(movementName.value ?? '', movementDescription.value ?? '', `http://localhost:38901/${result1.data}`, dropdownValue.value['_id'])

            if (result2.status === 201) {
                toast.add({ severity: 'success', summary: 'Created', detail: 'Movement created...', life: 3000 });
            }
        }
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Invalid', detail: 'Upload failed', life: 3000 });
    }
}
</script>

<template>
    <div class="grid mt- ">

        <div class="col-8 m-auto ">
            <Toast />
            <div class="card ">
                <span class="p-float-label">
                    <InputText class="w-8" id="username" type="text" v-model="movementName" />
                    <label for="username">Movement name</label>
                </span>
                <br>
                <Textarea class="w-8" v-model="movementDescription" placeholder="About movement" :autoResize="true" rows="3"
                    cols="30" />

                <br>


                <br>
                <Dropdown class="w-8" v-model="dropdownValue" :options="dropdownValues" optionLabel="name"
                    placeholder="Select Category" />

                <br>
                <br>

                <input type="file" @change="onUpload" accept="image/png, image/gif, image/jpeg">

                <hr>

                <Button label="Submit" icon="pi pi-check" @click="createMovementM" />


            </div>
            <div class="card ">
                <h2>Create Category</h2>
                <br>
                <span class="p-float-label">
                    <InputText class="w-8" id="username" type="text" v-model="categoryName" />
                    <label for="username">Category Name</label>
                </span>
                <br>

                <!-- <br>
                <h3>ctegory image</h3>
                <FileUpload name="demo[]" @uploader="onUpload" :multiple="true" accept="image/*" :maxFileSize="1000000"
                    customUpload />

 -->
                <Button label="Create" class="mr-2 mb-2" @click="createCategoryC()" />

            </div>
        </div>
    </div>
</template>
