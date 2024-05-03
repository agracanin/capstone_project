<script setup>

import { PLAYER_TURN_STATE } from '../../../util/enums';

const { playerColor, phase, nextPhase } = defineProps(['playerColor', 'phase', 'nextPhase']);

function displayText(phase) {
    console.log(`TurnController: Turn State: ${phase}`)
    if (phase == PLAYER_TURN_STATE.DRAFT) {
        return "Draft"
    } else if (phase == PLAYER_TURN_STATE.ATTACK) {
        return "Attack"
    } else if (phase == PLAYER_TURN_STATE.REINFORCE) {
        return "Reinforce"
    } else {
        return "Error"
    }
}

function calculatePill(position, phase) {
    if (position == phase) {
        return true
    }
    return false
}

</script>

<template>
    <div class="controller">
        <div class="icon-container player" :style="{ backgroundColor: playerColor }">
            <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 448 512">
                <path
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
        </div>
        <div class="turn-container" :style="{ borderColor: playerColor }">
            <p class="turn-status"> {{ displayText(phase) }}</p>
            <div class="phases" :key="phase">
                <!-- Add active phase check -->
                <div class="phase-pill" :class="{ 'active-phase': calculatePill(1, phase) }"
                    :style="{ borderColor: calculatePill(1, phase) ? playerColor : '' }">
                </div>
                <div class="phase-pill" :class="{ 'active-phase': calculatePill(2, phase) }"
                    :style="{ borderColor: calculatePill(2, phase) ? playerColor : '' }">
                </div>
                <div class="phase-pill" :class="{ 'active-phase': calculatePill(3, phase) }"
                    :style="{ borderColor: calculatePill(3, phase) ? playerColor : '' }">
                </div>
            </div>
            <div class="turn-button" :style="{ backgroundColor: playerColor }" @click="nextPhase()">
                <!-- Check if player's turn -->
                Next Phase
            </div>
        </div>
        <div class="icon-container dice" :style="{ backgroundColor: playerColor }">
            <!-- DRAFT phase -->
            <img v-if="phase === PLAYER_TURN_STATE.DRAFT" src="../assets/troopsgroup.svg" alt="Troops Image">

            <!-- ATTACK phase -->
            <img class="blitz" v-else-if="phase === PLAYER_TURN_STATE.ATTACK" src="../assets/blitzdice.svg"
                alt="Dice Image">

            <!-- If we add a switch from blitz mode -->
            <!-- <img src="../assets/slowroll-dice" alt="Slow Roll Dices"> -->

            <!-- REINFORCE phase -->
            <img v-else-if="phase === PLAYER_TURN_STATE.REINFORCE" src="../assets/shield.svg" alt="Shield Image">

            <!-- SOMETHING BROKE phase -->
            <span v-else>ERROR</span>
        </div>
    </div>
</template>

<style scoped>
.controller {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    user-select: none;
}

.icon-container {
    height: 80px;
    width: 80px;
    border: 2px solid rgba(0, 0, 0);
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.player {
    margin-right: -45px;
    z-index: 1;
}

.dice {
    margin-left: -45px;
    z-index: 1;
}

.turn-container {
    background-color: rgba(0, 0, 0, 0.5);
    border: 3px solid red;
    height: 70px;
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.turn-status {
    font-size: 1.3em;
    transform: translateY(-50%);
    color: white;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 1.1px;
    text-shadow:
        -1px -1px 0 rgba(0, 0, 0, 0.5),
        1px -1px 0 rgba(0, 0, 0, 0.5),
        -1px 1px 0 rgba(0, 0, 0, 0.5),
        1px 1px 0 rgba(0, 0, 0, 0.5);
    -webkit-text-stroke-width: 1.3px;
    -webkit-text-stroke-color: black;
}

.phases {
    display: flex;
    gap: 0.5em;
    transform: translateY(-50%);
    align-items: center;
}

.phase-pill {
    height: 10px;
    width: 45px;
    background-color: gray;
    border: 1px solid black;
    border-radius: 50px;
}

.active-phase {
    background-color: white;
    border: 2px solid red;
}

.turn-button {
    font-size: 1.2em;
    padding: 0.4em 0;
    width: 180px;
    background-color: gray;
    transform: translateY(20%);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    font-weight: 900;
    color: white;
    cursor: pointer;
    border: 2px solid rgba(0, 0, 0, 0.8);
    text-shadow:
        -1px -1px 0 rgba(0, 0, 0, 0.5),
        1px -1px 0 rgba(0, 0, 0, 0.5),
        -1px 1px 0 rgba(0, 0, 0, 0.5),
        1px 1px 0 rgba(0, 0, 0, 0.5);
    -webkit-text-stroke-width: 1.3px;
    -webkit-text-stroke-color: rgba(0, 0, 0, 0.5);
}

.icon-container>img {
    width: 60px;
    height: 60px;
    user-select: none;
    pointer-events: none;
}

.icon-container>.blitz {
    width: 70px;
    height: 70px;
}
</style>