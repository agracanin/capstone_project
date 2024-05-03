<script setup>
// Global Styles
import './assets/styles/style.css';
// Components
import Homepage from './components/Homepage.vue';
import Lobby from './components/lobby/Lobby.vue'
import game from './components/game/Game.vue'
// State Imports
import GameStore from './store/game.js'
import { storeToRefs } from 'pinia';
// Util
import { GAMESTATE } from './util/enums';

const gamestore = GameStore()
const { Game } = storeToRefs(gamestore)

</script>

<template>
  <game v-if="Game.game_state == GAMESTATE.STARTING_GAME || Game.game_state == GAMESTATE.PLAYING_GAME" />
  <Lobby v-else-if="Game.game_state == GAMESTATE.FILLING_LOBBY"/>
  <Homepage v-else/>
</template>

