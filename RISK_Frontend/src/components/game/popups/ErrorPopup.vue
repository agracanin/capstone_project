<script setup>

const { err, ResetError } = defineProps(['err','ResetError']);

</script>

<template>

    <div v-if="err != ''" class="popupcontainer" @click="ResetError">
        <div class="popupbackground">
            <div class="popuperror">{{ err }}</div>
        </div>
    </div>
    
</template>

<style scoped>
    .popupcontainer{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }
    .popupbackground{
        position: absolute;
        background-color: rgb(48,48,48, 0.8);
        padding: 2rem;
        border-radius: 25px;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .popuperror{
        font-size: 1.5rem;
        color: orange;
        font-weight: 600;
        -webkit-text-stroke: 1px rgb(96, 93, 93);
        user-select: none;
    }
    
</style>
