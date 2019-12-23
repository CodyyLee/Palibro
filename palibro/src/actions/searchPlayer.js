export const searchPlayer = (players) =>  {
    return ({
        type: "SEARCH_PLAYER",
        results: players.map(player => {
            return player
        })
    })
}