<script setup>
import { ref } from 'vue'

const props = defineProps(['setUsername', 'reset'])

const username = ref ("");
const err = ref("");

function EnterName() {
    // Validate This -> Go To The Server 
    if (username.value === "") {
        err.value = "Username Required"
        return;
    }
    if (username.value.length > 12) {
        err.value = "Username Must Be Less Than 12";
        return;
    }
    // If Successful
    props.setUsername(username.value);
}
</script>

<template>
    <div class="container">
        <div class="prompt">
            <h1>Please Enter a Username</h1>
            <input type="text" @keydown.enter="EnterName" placeholder="Username" v-model="username" autofocus>
            <p class="error">{{ err }}</p>
            <button @click="EnterName">Enter Name</button>
            <div id="close" @click="props.reset()">X</div>
        </div>
    </div>
</template>
