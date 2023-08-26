<template>
        
    <h3>Not responded tickets</h3>
    <div v-for="message in npTickets" class="card ">
        <div class=" flex align-items-center py-2">
            <div
                :class="`w-3rem h-3rem flex align-items-center justify-content-center bg-${message.responded === true ? 'green' : 'blue'}-100 border-circle mr-3 flex-shrink-0`">
                <i :class="`pi pi-comment text-xl text-${message.responded === true ? 'green' : 'blue'}-500`"></i>
            </div>

            <span class="text-900 line-height-3 ">{{ message.name }}
                <span class="text-700 "><a>{{ message.senderEmail }}</a></span>
            </span>
        </div>
        <Button style="float: right;" label="Show" icon="pi pi-external-link" @click="openDialog(message)" />
        <Dialog v-model:visible="visible" header="Message" :style="{ width: '50vw' }">
            <p> {{ message.message }} </p>

            <span class="p-input-icon-left">
                <i class="pi pi-paperclip" />
                <InputText v-model="subject" placeholder="Subject" />
            </span>
            <div style="height: 20px;"></div>
            <Textarea v-model="messageCont" rows="5" cols="30" placeholder="Message" />
            <p></p>
            <Button style="float: right;" label="Respond" icon="pi pi-link" @click="respond(message._id)" />

        </Dialog>
        <Toast />
    </div>
    <div v-if="npTickets.length == 0 && loading1 === false">
        <p style="font-weight: bold; color: rgb(176, 173, 173);">Nothing here</p>
    </div>
    <div v-if="loading1 === true">
        <p style="font-weight: bold; color: rgb(176, 173, 173);">Loading...</p>
    </div>
    <h3>All tickets</h3>
    <!-- <InputText  placeholder="Search" style="width: 30% ;" />
                                <div style="height: 20px;"></div> -->
    <div v-for="message in messages" class="card ">
        <div class=" flex align-items-center py-2">
            <div
                :class="`w-3rem h-3rem flex align-items-center justify-content-center bg-${message.responded === true ? 'green' : 'blue'}-100 border-circle mr-3 flex-shrink-0`">
                <i class="pi pi-comment text-xl text-green-500"></i>
            </div>

            <span class="text-900 line-height-3 ">{{ message.name }}
                <span class="text-700 "><a>{{ message.senderEmail }}</a></span>
            </span>
        </div>
        <Button style="float: right;" label="Show" icon="pi pi-external-link" @click="openDialog(message)" />
        <Toast />
    </div>
    <Dialog v-model:visible="visible" header="Message" :style="{ width: '50vw' }">
        <p> {{ messageSel.message }} </p>

        <span class="p-input-icon-left">
            <i class="pi pi-paperclip" />
            <InputText v-model="subject" placeholder="Subject" />
        </span>
        <div style="height: 20px;"></div>
        <Textarea v-model="messageCont" rows="5" cols="30" placeholder="Message" />
        <p></p>
        <Button style="float: right;" label="Respond" icon="pi pi-link" @click="respond(messageSel._id)" />

    </Dialog>
    <div v-if="messages.length == 0 && loading2 === false">
        <p style="font-weight: bold; color: rgb(176, 173, 173);">Nothing here</p>
    </div>

    <div v-if="loading2 === true">
        <p style="font-weight: bold; color: rgb(176, 173, 173);">Loading...</p>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAllTickets, respondTicket, getNotResponded } from '../modules/tickets'
import { useToast } from 'primevue/usetoast';

const messages = ref([])
const npTickets = ref([])
const visible = ref(false);
const toast = useToast();
const subject = ref('')
const messageCont = ref('')
const messageSel = ref()
const loading1 = ref(false)
const loading2 = ref(false)

onMounted(async () => {
    loading1.value = true;
    const tickets = await getAllTickets();
    loading1.value = false;
    messages.value = tickets.data;


    loading2.value = true;
    const notRespondedTickets = await getNotResponded();
    loading2.value = false;
    npTickets.value = notRespondedTickets.data;    
})

const respond = async (ticketId) => {
    if (messageCont.value === '' || subject.value === '') {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Fill the subject and message', life: 3000 });
        return;
    }

    const result = await respondTicket(ticketId, subject.value, messageCont.value)

    if (result.status === 201) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Responded!', life: 3000 });
        visible.value = false;
        messageCont.value = ''
        return;
    }

    toast.add({ severity: 'error', summary: 'Error', detail: 'An error oucured', life: 3000 });

}


const openDialog = async (message) => {
    messageSel.value = message;
    visible.value = true;
}

</script>