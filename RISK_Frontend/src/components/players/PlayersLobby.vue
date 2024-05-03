<script setup>
import { useClipboard } from '@vueuse/core';

const { players, emptyslots, gameID } = defineProps(['players', 'emptyslots', 'gameID']);
import { playerColorsTransparent } from '../colors/player_colors';

const inviteLink = document.URL + `?lobby=${gameID}`
const { text, copy, copied, isSupported } = useClipboard({ inviteLink })

</script>

<template>
    <div class="lobby-players">
        <div class="player" v-for="(player, index) in players" :key="index"
            :style="{ 'background-color': playerColorsTransparent[player.color] }" >
            <div class="player-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 448 512">
                    <path
                        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
            </div>
            <div class="player-details">
                <span class="username">{{ player.username }}</span>
            </div>
        </div>

        <div class="player empty-slot" v-for="n in emptyslots" :key="n">
            <button @click="copy(inviteLink)">
                <span v-if="!copied">Invite Players</span>
                <span v-else>Copied!</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.lobby-players {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em 0 0 ;
    gap: 10%;
}

.player {
    display: flex;
    height: 20%;
    border: 3px solid black;
    padding: 0.5em 1em;
    flex: 1 0 40%;
    align-items: center;
    border-radius: 20px;
    gap: 0.5em;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.player-details {
    width: 100%;
}

.empty-slot {
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
    color: #F5F5F5;
}

.empty-slot:hover {
    background-color: rgba(200, 200, 200, 0.6);
}

.empty-slot:hover>button {
    background-color: rgba(200, 200, 200, 0.6);
    color: black;
}

.empty-slot>button {
    padding: 0.5em;
    outline: none;
    border-radius: 10px;
    border: 3px solid black;
    cursor: pointer;
    background: none;
    color: inherit;
    width: 100px;
}

.username {
    font-size: 1.5em;
}

svg {
    fill: #F5F5F5;
}
</style>
