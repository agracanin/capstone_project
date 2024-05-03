<script setup>

import { ref } from 'vue'

const test = ref(0) 
const text = ref("")

function increment() {
    test.value++;
}

function decrement() {
    test.value--;
}

</script>

<template>
    <div class="counter">
        <p>Test: {{ test }}</p>
        <div class="buttons">
            <p @click="increment">+</p>
            <p @click="decrement">-</p>
        </div>
    </div>

    <div class="counter">
        <label>Name: </label>
        <input v-model="text" /> 
        <div>{{ text }}</div>
    </div>

</template>

<style scoped>
    .counter {
        width:fit-content;
        margin:auto;
    }

    .buttons {
        display:flex;
        gap: 1rem;
    }

    .buttons p {
        padding: .5rem;
        user-select: none;
        font-weight: 800;
        font-size: 2rem;
        background:lightgrey;
        color:black;
    }

</style>
