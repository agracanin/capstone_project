<script setup>
import { ref } from 'vue'

// State Imports
import GameStore from '../../store/game.js'
import { storeToRefs } from 'pinia';
import PlayersLobby from '../players/PlayersLobby.vue';
import Chat from "../chat/Chat.vue"

const gamestore = GameStore()
const { Game, PlayerID } = storeToRefs(gamestore)

const players = ref(Game.value.players);
const err = ref(undefined);

gamestore.socket.on('playerjoined', (res) => {
    // console.log(`Lobby - ${JSON.stringify(res.players)}`);
    gamestore.Game.players = res.players
    players.value = res.players
})

const MAX_PLAYERS = 6;

function StartGame() {
    if (players.length < 3) {
        err.value = "You Need At Least 3 Players To Start"
        return
    }
    if (!players.value[PlayerID.value].party_leader) {
        err.value = "You Must Be Party Leader To Start The Game"
        return
    }
    gamestore.StartGame();
};

function LeaveGame() {
    gamestore.LeaveGame();
};

gamestore.socket.on('player_left', (res) => {
    // console.log(`Player Left Updated Lobby - ${JSON.stringify(res.players)}`);
    gamestore.Game.players = res.players;
    players.value = res.players;
    console.log(gamestore.PlayerID);
    if (res.player_id < gamestore.PlayerID){
        gamestore.PlayerID -= 1;
        console.log(gamestore.PlayerID);
    };
});

gamestore.socket.on('startgame', (res) => {
    // console.log(`startgame res: ${res.game_state}`)
    if (res.err != undefined) {
        err.value = res.err;
        return;
    }
    gamestore.Game.game_state = res.game_state;
})

</script>

<template>
    <div class="lobby-wrapper">
        <div class="logo">
            <h1>RISK ONLINE</h1>
            <button class="leave-game" @click="LeaveGame">Leave Game</button>
        </div>
        <div class="lobby-content">
            <PlayersLobby :players="Game.players" :emptyslots="MAX_PLAYERS - players.length"
                :gameID="gamestore.Game.game_id" />
            <Chat :players="players" />
        </div>
        <div class="buttons" v-if="players[PlayerID].party_leader && players.length >= 3">
            <div class="button" @click="StartGame">Start Game</div>
            <p class="error">{{ err }}</p>
        </div>
    </div>
</template>

<style scoped>
.lobby-wrapper {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../../assets/images/lobby-background.jpg);
    background-size: cover;
    background-position: center;
    display: grid;
    height: 100vh;
    grid-template-rows: 100px 1fr 200px;
    grid-template-columns: 100px 1fr 100px;
    grid-template-areas: "logo logo logo"
        ". lobby-content ."
        ". buttons .";
    color: #F5F5F5;
}

.logo {
    margin-top: 1em;
    grid-area: logo;
    font-size: 1em;
    text-align: center;
}

.lobby-content {
    grid-area: lobby-content;
    display: grid;
    grid-template-columns: 1fr 400px;
    grid-template-rows: 1fr;
    max-height: 100%;
}

.hidden {
    display: none;
}

.buttons {
    grid-area: buttons;
}

.button {
    padding: 2rem;
    border-radius: 5px;
    background: rgba(139, 0, 0, 1);
    margin: 1rem 0;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    transition: all 600ms ease;
}

.button:hover {
    background: rgba(110, 0, 0, 1);
    cursor: pointer;
    color: rgb(230, 230, 230);
}

.leave-game {
    padding: 0.5em 1em;
    border-radius: 10px;
    outline: none;
    background-color: rgba(255, 0, 0, 0.7);
    border: 2px solid black;
    color: #F5F5F5;
    cursor: pointer;
}

.leave-game:hover {
    background-color: rgba(255, 0, 0, 1);
}
</style>
