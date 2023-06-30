<script setup>
import { ref } from 'vue';

const toolbarItems = ref([
    {
        label: 'Save',
        icon: 'pi pi-check'
    },
    {
        label: 'Update',
        icon: 'pi pi-upload'
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash'
    },
    {
        label: 'Home Page',
        icon: 'pi pi-home'
    }
]);
const cardMenu = ref([
    { label: 'Save', icon: 'pi pi-fw pi-check' },
    { label: 'Update', icon: 'pi pi-fw pi-refresh' },
    { label: 'Delete', icon: 'pi pi-fw pi-trash' }
]);
const menuRef = ref(null);

const toggle = () => {
    menuRef.value.toggle(event);
};
</script>

<template>
    <div class=" w-10 md:w-5 m-auto align-items-center mt-8">
        <!-- <div class="col-12">
            <div class="card">
                <h5>Toolbar</h5>
                <Toolbar>
                    <template v-slot:start>
                        <Button label="New" icon="pi pi-plus" class="mr-2" />
                        <Button label="Open" icon="pi pi-folder-open" class="p-button-secondary mr-2" />

                        <i class="pi pi-bars p-toolbar-separator mr-2"></i>

                        <Button icon="pi pi-check" class="p-button-success mr-2" />
                        <Button icon="pi pi-trash" class="p-button-warning mr-2" />
                        <Button icon="pi pi-print" class="p-button-danger" />
                    </template>
                    <template v-slot:end>
                        <SplitButton label="Options" :model="toolbarItems"></SplitButton>
                    </template>
                </Toolbar>
            </div>
        </div> -->
        


            <div class="card ">
                    <div class="align-items-center  ">
                        <div class="p-fluid">
                            <div class="field">
                                <label for="username">Username</label>
                                <InputText id="username" type="text" />
                            </div>
                            <div class="field">
                                <label for="password">Password</label>
                                <InputText id="password" type="password" />
                            </div>
                            <Button label="Login" class="mt-2"></Button>
                        </div>
                    </div>

              

            </div>
<!-- 
        <div class="col-12">
            <div class="card">
                <h5>Splitter</h5>

                <Splitter style="height: 300px" class="mb-5">
                    <SplitterPanel :size="30" :minSize="10" style="overflow: scroll">
                        <div className="h-full flex align-items-center justify-content-center">Panel 1</div>
                    </SplitterPanel>
                    <SplitterPanel :size="70" style="overflow: scroll">
                        <Splitter layout="vertical">
                            <SplitterPanel :size="15">
                                <div className="h-full flex align-items-center justify-content-center">Panel 2</div>
                            </SplitterPanel>
                            <SplitterPanel :size="50">
                                <div className="h-full flex align-items-center justify-content-center">Panel 3</div>
                            </SplitterPanel>
                        </Splitter>
                    </SplitterPanel>
                </Splitter>
            </div>
        </div> -->
    </div>
</template>
