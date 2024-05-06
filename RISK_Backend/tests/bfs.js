import Game from '../game/game.js'

/* Test for reinforce algorithm */
const DEBUG = true;

const g = new Game("56")

function Print(game) {
    console.log('Printing Game: ')
    console.log(JSON.stringify(game))
    console.log("\n")
}

const from_territory = 0
const to_territory = 8


g.addPlayer("test1", "1")
g.addPlayer("test2", "2")
g.addPlayer("test3", "3")
g.addPlayer("test4", "4")

g.randomlyAssignTerritories()
Print(g)

g.territories[0].player = 0
g.territories[2].player = 0
g.territories[3].player = 0
g.territories[4].player = 0
g.territories[8].player = 0


const result = g.CalculateReinforcePath(g.territories[0].player, from_territory, to_territory)

console.log(`Result: ${result}`)

