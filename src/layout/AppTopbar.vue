<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';

const { layoutConfig, onMenuToggle } = useLayout();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const date = ref();
const router = useRouter();
const password = ref(false);
const visible = ref(false);
const nodes = ref([
]);

onMounted(() => {
    bindOutsideClickListener();
    
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});


const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const onSettingsClick = () => {
    topbarMenuActive.value = false;
    router.push('/documentation');
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};

const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>Admin</span>
            
        </router-link>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
                      
           
<Dialog v-model:password="password"  modal :style="{ width: '50vw' }" >
    <h2>password</h2>
    <InputText type="text" v-model="value" />
</Dialog>  



<p style="font-size: x-large;margin: auto; margin-right: 20px;">2023/5/8</p>
<Button icon="pi pi-user" @click="visible = true" />
<Dialog v-model:visible="visible"   modal :style="{ width: '50vw' }">
 
 <!-- <table style="margin: auto;width: 70%;" border="1">
<tr style="margin: auto;">
    <td>Work</td>   <td>Date</td>
    
</tr>
<tr v-for="text in texts">
    <td>{{ text.work }}</td> <td>{{ text.date }}</td>
</tr>
 </table>
 <br>
 <br> -->
 <div class="card">
        <TreeTable :value="nodes" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 25]">
            <Column field="Work" header="Work" expander></Column>
            <Column field="Date" header="Date"></Column>
        </TreeTable>
    </div>
 <Button style="float: right;" label="change password"  @click="password = true" />
</Dialog>
        </div>
    </div>
    
</template>

<style lang="scss" scoped></style>
