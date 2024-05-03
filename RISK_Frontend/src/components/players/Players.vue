<script setup>

const { players } = defineProps(['players']);

import playerColors from '../colors/player_colors';


</script>

<template>
    <div class="container">
        <div class="player-container" v-for="(player, index) in players" :key="index">
            <div class="avatar" :style="{ 'background-color': playerColors[player.color] }">
                <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 448 512">
                    <path
                        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
            </div>
            <div class="player-details" :style="{ 'background-color': playerColors[player.color] }">
                <h3>{{ player.username }}</h3>
                <div class="player-stats">
                    <div class="troops tracker">
                        <svg id="Layer_1" height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"
                            data-name="Layer 1">
                            <path
                                d="m23.414.587a2.022 2.022 0 0 0 -1.941-.513 16.461 16.461 0 0 0 -6.479 3.983l-9.476 9.475a14.58 14.58 0 0 0 -4.376-1.522 1 1 0 0 0 -.286 1.979 12.632 12.632 0 0 1 5.353 2.387l-3.709 3.71-.793-.793a1 1 0 1 0 -1.414 1.414l3 3a1 1 0 1 0 1.414-1.414l-.793-.793 3.709-3.71a12.609 12.609 0 0 1 2.387 5.354 1 1 0 0 0 .99.856.881.881 0 0 0 .144-.011 1 1 0 0 0 .847-1.13 14.515 14.515 0 0 0 -1.522-4.376l9.475-9.476a16.52 16.52 0 0 0 4.01-6.574 1.994 1.994 0 0 0 -.54-1.846z" />
                        </svg>
                        <span>{{ player.troops }}</span>
                    </div>
                    <div class="territories tracker">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em"
                            viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                            <path
                                d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z" />
                        </svg>
                        <span>{{ player.territories }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: .5em;
    width: fit-content;
    height: fit-content;
    user-select:none;
}

.player-container {
    display: flex;
    border-left: none;
    justify-content: right;
    align-items: center;
}

.avatar {
    position: relative;
    z-index: 1;
    border: 3px solid black;
    border-radius: 100%;
    height: 90px;
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -45px;
}

.player-details {
    border: 3px solid black;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-left: none;
    width: 250px;
    height: 80px;
    padding: 10px 50px;
}

svg {
    fill: black
}

.stats {
    margin-left: 2px;
    display: flex;
    gap: 30px;
}

.player-stats {
    display: flex;
    width: 75px;
    justify-content: space-between;
}

.tracker {
    display: flex;
    align-items: center;
    gap: 0.2em;
}

.tracker>span {
    font-weight: bold;
}

@media (max-width: 1600px) {
    .player-stats {
        flex-direction: column;
    }
    .player-details h3 {
        display:none;
    }
    .player-details {
        width: 125px;
    }
}

</style>
