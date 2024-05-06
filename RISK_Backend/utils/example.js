/* 
    Big Picture View Of Game Objects - Data Structures
*/

'https://ourgame.com/83930-dfnsd-sjfd90d9'

const game = {
    continents: [{}],
    territories: [{}],
    players: [{}],
    cards: [{}],
    currentTurn: 1, // playerID
    uuid: "",
}

const continent = {
    id: 0,
    name: "North America",
    territory_count: 9,
    player: undefined,
    bonus: 5
}

const territory = {
    id: 0,
    continent: 0,
    player: undefined,
    name: "Alaska",
    troops: 0,
    connections: [1, 2, 36]
}

const player = {
    id: 1,
    username: "",
    party_leader: false,
    color: "",
    alive: true,
    cards: [{}],
    troops: 0,
    deployable_troops: 0,
    territories: 0,
    turn_state: 1,
}

const riskCard = {
    id: 1,
    name: "",
    description: "",
}