import { defineStore } from 'pinia'
import socket from './socket.js'

export const GameStore = defineStore("GameStore", {
    state: () => ({
        Game: {},
        PlayerID: undefined,
        socket: socket,
    }),
    getters: {
        getGameKey() {
            return this.GameKey;
        }
    },
    actions: {
        NewGame(username) {
            this.socket.emit('newgame', username)
        },
        JoinGame(gameid, username) {
            this.socket.emit('joingame', gameid, username)
        },
        // gameid, playerid, message
        SendMessage(message) {
            this.socket.emit('message', this.Game.game_id, this.PlayerID, message)
        },
        SystemMessage(message){
            this.socket.emit('message', this.Game.game_id, -1, message)
        },
        StartGame() {
            this.socket.emit('startgame', this.Game.game_id)
        },
        LeaveGame() {
            this.SystemMessage(`${this.Game.players[this.PlayerID].username} has left the game.`);
            this.socket.emit('leavegame', this.Game.game_id, this.PlayerID);
            // Announce New Party Leader If Leader Left And Lobby Isn't Empty
            if (this.PlayerID == 0 && this.Game.players.length > 1) {
                this.SystemMessage(`${this.Game.players[1].username} is the new leader!`)
            }
            // Reset Everything
            this.Game = {};
            this.PlayerID = undefined;
            window.location.reload();
        },
    }
})

export default GameStore