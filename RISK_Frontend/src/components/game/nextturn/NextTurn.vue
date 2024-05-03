<script setup>
import Modal from '../../modal/Modal.vue';

const { player, playerColor, show, troopReward } = defineProps(['player', 'playerColor', 'show', 'troopReward']);

</script>

<template>
    <Modal v-show="show">
        <div class="next-turn-container">

            <div class="namedisplay" :style="{ backgroundColor: playerColor }">
                    It is {{ player.username }}'s turn
            </div>

            <div class="holder">
                <div class="trooprecieved" :style="{ backgroundColor: playerColor }">Recieved Troops</div>
                <div class="troopnumber" :style="{ borderColor: playerColor }">{{ troopReward }}</div>
                <div class="trooptotal">
                    Total troops<br>
                    <p>Troops Awarded for occupying <b>{{ player.territories }} territories</b></p>
                </div>
            </div>
        </div>
    </Modal>
</template>

<style scoped>
    .namedisplay{
        position: absolute;
        padding: .5rem 0;
        width: min(600px, 50%);
        text-align: center;
        color: white;
        transform: translateX(-50%);
        top: 12px;
        left: 50%;
        border-radius: 0px 0px 25px 25px;
        user-select:none;
        font-size:2rem;
        font-weight: 900;
    }
    .trooprecieved{
        position:absolute;
        top:0;
        right:0;
        left:0;
        padding: 1rem 0;
        border-radius: 25px 25px 0px 0px;
        font-size:2rem;
        font-weight: 900;
        user-select:none;
        text-align: center;
    }
    .holder{
        position: absolute;
        background-color: rgb(0, 0, 0, .6);
        color: white;
        /* padding: 10em 17.1em 10em 17.1em; */
        width: min(50%, 600px);
        /* height:30vh; */
        height: 350px;
        border-radius: 25px 25px 25px 25px;
        transform: translate(-50%, -50%);
        left: 50%;
        top: max(40%, 300px);
        user-select:none;
    }
    .trooptotal {
        position: absolute;
        font-size: 1.2rem;
        top: 80%;
        left:50%;
        width:100%;
        text-align:center;
        transform: translate(-50%, -50%);
        user-select:none;
        font-size: 1.1rem;
    }
    .trooptotal p {
        font-size: 1.5rem;
    }
    .troopnumber {
        position: absolute;
        top: 47%;
        left: 50%;
        border-radius: 50%;
        border-width: 15px;
        border-style: solid;
        padding: 20px 40px;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        font-weight:800;
    }
</style>
