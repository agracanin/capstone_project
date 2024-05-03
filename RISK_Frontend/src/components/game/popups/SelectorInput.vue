<script setup>
import Modal from '../../modal/Modal.vue';
import TroopSelector from '../popups/TroopSelector.vue'

const { troopCount, selectorOutput, hideDraftSelector: hideSelector } = defineProps(['troopCount', 'selectorOutput', 'hideSelector']);

</script>

<template>
    <Modal>
        <div class="top-text">
            <p><slot></slot></p>
        </div>
        <TroopSelector :troopCount="troopCount" :selectorOutput="selectorOutput" :closeSelector="hideSelector"/>
    </Modal>
</template>

<style scoped>
    .top-text{
        position: absolute;
        background-color: rgb(0, 0, 0, .6);
        padding: .5rem 0;
        width: min(600px, 50%);
        text-align: center;
        color: white;
        transform: translateX(-50%);
        top: 30px;
        left: 50%;
        border-radius: 0px 0px 25px 25px;
        font-size:2.5rem;
        font-weight: 900;
        width: min(75%, 700px);
        height: 60px;
        transform: translate(-50%, -50%);
        user-select:none;
    }
    
</style>
