<script setup>
import { ref } from 'vue'

const props = defineProps(['setLobby', 'reset'])

const gamekey = ref ("");
const err = ref("");

function EnterGame() {
    // Validate This -> Go To The Server 
    if (gamekey.value === "") {
        err.value = "No Game Key Entered"
        return;
    }
    // console.log(`GameKey: ${gamekey.value}`)
    // If Successful
    props.setLobby(gamekey.value);
}
</script>

<template>
    <div class="container">
        <div class="prompt">
            <h1>Enter A Game Key</h1>
            <input type="text" placeholder="Game Key" @keydown.enter="EnterGame" v-model="gamekey">
            <p class="error">{{ err }}</p>
            <button @click="EnterGame">Enter Game</button>
            <div id="close" @click="props.reset()">X</div>
        </div>
    </div>
</template>
