<script setup>
import { ref } from 'vue'
// Components
import Modal from "./modal/Modal.vue"
import Username from './popups/Username.vue'
import JoinGame from './popups/JoinGame.vue';
import JoinGameDisplay from './popups/JoinGameDisplay.vue';
// State Imports
import GameStore from '../store/game.js'
import { storeToRefs } from 'pinia';

// Init State
const gamestore = GameStore()

const err = ref(undefined);

const isUsernameSet = ref(true);
const isLobbySet = ref(true);
const isJoinGame = ref(0);
const lobbyKey = ref("");


const setUsername = (username) => {
    isUsernameSet.value = true;
    if (isJoinGame.value) {
        gamestore.JoinGame(lobbyKey.value, username)
    } else {
        gamestore.NewGame(username)
    }
}

const setLobby = (gamekey) => {
    lobbyKey.value = gamekey
    isJoinGame.value = true;
    isLobbySet.value = true;
    isUsernameSet.value = false;
}

function StartNewGame() {
    // console.log(`Clicked Start Game`)
    isUsernameSet.value = false;
    if (isJoinGame.value) isLobbySet.value = false;
}

function JoinAGame() {
    // console.log(`Clicked Join Game`)
    isJoinGame.value = true;
    isLobbySet.value = false;
}

// Socket Events
gamestore.socket.on('newgame', (res) => {
    console.log(res);
    if (CheckErrs(res)) return;
    gamestore.Game = res.game;
    gamestore.PlayerID = res.player_id;
})

gamestore.socket.on('joingame', (res) => {
    console.log(`Homepage -- ${res}`)
    if (CheckErrs(res)) return;
    gamestore.Game = res.game;
    gamestore.PlayerID = res.player_id;
    gamestore.SystemMessage(`${res.game.players[res.player_id].username} has joined the game.`);
})

// Util Functions

function ResetVars() {
    isUsernameSet.value = true
    isLobbySet.value = true
    isJoinGame.value = false
    lobbyKey.value = ""
}

function CheckErrs(res) {
    if (res.err !== undefined) {
        err.value = res.err;
        ResetVars()
        return true;
    }
    return false;
}

// Check the URL For Game Key

function autoJoinFromLobbyURL() {
    const url = document.URL
    const re_match = url.match(/\?lobby=.{36}/)
    if (re_match) {
        const key = re_match[0].replace('?lobby=', "")
        setLobby(key)
        // Reset URL To Default
        const siteurl = url.match(/https{0,1}:\/\/.*:\d{0,5}/)[0]
        window.history.replaceState(null, '', siteurl)
    }
}

const showAvailableGames = ref(false)
function ToggleAvailableGames() {
    showAvailableGames.value = showAvailableGames.value ? false : true
}

autoJoinFromLobbyURL()

</script>

<template>
    <div class="container">

        <div class="banner-bg">
            <div class="overlay"></div>
            <img src="/src/assets/images/fighter-jet.jpg" />
        </div>

        <div class="buttons">
            <div class="button" @click="StartNewGame">Start A New Game</div>
            <!-- <div class="button" @click="JoinAGame">Join A Game</div> -->
            <div class="button" @click="ToggleAvailableGames">Join A Game</div>
            <div class="error textcenter" v-if="err !== undefined"> {{ err }}</div>
        </div>

        <Modal v-show="!isUsernameSet">
            <Username :setUsername="setUsername" :reset="ResetVars" />
        </Modal>

        <!-- <Modal v-show="isUsernameSet && !isLobbySet">
            <JoinGame :setLobby="setLobby" :reset="ResetVars" />
        </Modal> -->

        <JoinGameDisplay v-if="showAvailableGames" :setLobby="setLobby" :toggleAvailableGames="ToggleAvailableGames" />

    </div>
</template>

<style scoped>
.buttons {
    padding: 3rem;
    border-radius: 10px;
    width: max(400px, 20%);
    position: absolute;
    z-index: 20;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgb(48, 48, 48, .9);
}

.button {
    padding: 2rem;
    border-radius: 10px;
    background: lightgrey;
    margin: 1rem 0;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    transition: all 600ms ease;
}

.button:hover {
    background: grey;
    cursor: pointer;
    color: rgb(25, 241, 25);
}

.banner-bg {
    display: block;
    width: 100%;
    height: 100%;
}

.banner-bg img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.banner-bg .overlay {
    position: absolute;
    z-index: 10;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgb(48, 48, 48, .1);
}
</style>
