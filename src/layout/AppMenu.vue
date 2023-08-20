<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
        { label: 'Users', icon: 'pi pi-fw pi-table', to: '/users' },
        // { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel' },
        { label: 'Data', icon: 'pi pi-fw pi-chart-bar', to: '/chart' },
        { label: 'Upload', icon: 'pi pi-upload', to: '/file' },
        {label:'Animations' , icon :'pi pi-images' , to:'/pages/Crud'},
        {label:"Tickets" , icon:"pi pi-fw pi-comment" ,to:'/message'},
        {label:"Premium Requests" , icon:"pi pi-fw pi-shield" ,to:'/premium'},


    ]

    },
    // {
    //     label: 'UI Components',
    //     items: [
    //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
    //         { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input' },
    //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/floatlabel' },
    //         { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/invalidstate' },
    //         { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button', class: 'rotated-icon' },
    //         { label: 'List', icon: 'pi pi-fw pi-list', to: '/list' },
    //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree' },
    //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay' },
    //         { label: 'Media', icon: 'pi pi-fw pi-image', to: '/media' },

    //         { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu', preventExact: true },
    //         { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/messages' },
    //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/charts' },
    //         { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/misc' }
    //     ]
    // },
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
