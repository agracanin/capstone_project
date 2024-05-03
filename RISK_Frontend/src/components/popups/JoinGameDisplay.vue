<script setup>
import { ref } from 'vue'
import Modal from '../modal/Modal.vue';
import GameStore from '../../store/game.js'

const url = 'http://localhost:5000/games'

const {show, toggleAvailableGames, setLobby } = defineProps(['show', 'toggleAvailableGames', 'setLobby'])

// Fetch Games List Every Second While Open
var FetchData = setInterval( async () => FetchGames(), 1000)

const Games = ref([])

const AreGamesAvailable = ref("Loading...")

async function FetchGames() {
    const games = await fetch(url).then( res => res.json())
    Games.value = games.games
    if (Games.value.length <= 0) {
        AreGamesAvailable.value = "No Games Available"
    }
}

function ReturnGame(game) {
    console.log(`Selected Game: ${game.id}`)
    clearInterval(FetchData)
    CloseView()
    return setLobby(game.id)

}

function CloseView() {
    clearInterval(FetchData)
    toggleAvailableGames()
}

</script>


<template>

    <Modal>
        <div id="available-games">
            <div id="close" @click="CloseView">X</div>
            <div class="no-games" v-if="Games.length <= 0">
                <p>{{ AreGamesAvailable }}</p>
            </div>
            <div class="games" v-else>
                <div class="heading">
                    <h2>Game</h2>
                    <h2>Host</h2>
                    <h2>Players</h2>
                    <h2>Mode</h2>
                </div>
                <div class="game" v-for=" (game, i) in Games" :key="i" title="Click To Join" @click="ReturnGame(game)">
                    <p>Game {{ i+1 }}</p>
                    <p>{{ game.host }}</p>
                    <p>{{ game.players }}</p>
                    <p>Classic</p>
                </div>
            </div>
        </div>
    </Modal>

</template>

<style>
    #available-games {
        position: absolute;
        top:50%;
        right:50%;
        transform:translate(50%, -50%);
        height:80%;
        width:max(40%, 500px);
        color:white;
        background:rgb(48, 48, 48, 1);
        z-index:20;
        border-radius:10px;
        border:3px solid rgba(48, 48, 48, .8);
        overflow-y:auto;
    }

    .no-games {
        font-size:2rem;
        position:absolute;
        left:0;
        width:100%;
        text-align: center;
        top:45%;
        transform:translateY(-50%);
    }

    .games {
        margin-top: 3rem;
    }

    .heading {
        display:flex;
        padding: 1rem 0;
        text-align: center;
    }
    
    .heading h2 {
        min-width: 12ch;
    }

    .game {
        display:flex;
        padding: 1rem 0;
        width: 100%;
        transition: all 200ms ease;
        text-align: center;
    }

    .game:hover {
        background: lightblue;
        cursor:pointer;
        color:yellow;
        font-weight:800;
    }

    .game p {
        min-width: 18.5ch;
    }
</style>