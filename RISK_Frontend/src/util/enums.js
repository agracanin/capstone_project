/* 
    Store Constant Enums Here

    - Keep GAMESTATE Up To Date With Backend GAMESTATE
*/
export const GAMESTATE = {
    'FILLING_LOBBY': 0,
    'STARTING_GAME': 1,
    'PLAYING_GAME': 2,
    'COMPLETED': 3,
}

export const PLAYER_TURN_STATE = {
    'NOT_TURN': 0,
    'DRAFT': 1,
    'ATTACK': 2,
    'REINFORCE': 3,
}

export const PLAYER_EVENTS = {
    'DEPLOY_TROOPS': 0,
    'ATTACK': 1,
    'NEXT_PHASE': 2,
    'REINFORCE': 3,
}
