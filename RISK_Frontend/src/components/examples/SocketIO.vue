<script setup>
import { ref } from 'vue'
import socket from '../store/socket.js'

import { GameStore } from '../store/game.js';
// Testing
const gs = GameStore()

const message = ref("")
const messages = ref([])

socket.on('message', msg => {
    console.log(msg)
    messages.value.push(msg)
})

socket.on('newgame', res => {
    console.log(res);
    // Update State Etc.
})

function sendMessage() {
    if (message.value === '') return;
    gs.SendMessage(message.value)
    message.value = ""
}

gs.NewGame()

</script>

<template>
    <h1>Page Loaded...</h1>
    <input v-model="message" @keyup.enter="sendMessage"/>
    <button @click="sendMessage">Send</button>
    <div>
        <div v-for="msg in messages" :key="msg">{{ msg }}</div>
    </div>
</template>


<style>

</style>