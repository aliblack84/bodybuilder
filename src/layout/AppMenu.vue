<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
        { label: 'Users', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
        { label: 'Chart menu', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/chart' },
        { label: 'Upload', icon: 'pi pi-upload', to: '/uikit/file' },
        {label:'Animations' , icon :'pi pi-images' , to:'/pages/Crud'},
        {label:"messages" , icon:"pi pi-fw pi-comment" ,to:'/uikit/message'},
        {label:"premium requests" , icon:"pi pi-fw pi-shield" ,to:'/uikit/premium'},
        {label:"profile dialog" , icon:"" ,to:'/uikit/profileDialog'}


    ]

    },

    {
        items: [
        ]
    },
    {
        items: [
        ]
    },
    {
        items: [
    
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/login'
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/error'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },

        ]
    },
    {

    },
    {

    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <li>
       
        </li>
    </ul>
</template>

<style lang="scss" scoped></style>
