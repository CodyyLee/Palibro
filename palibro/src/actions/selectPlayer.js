export const selectPlayer = player => {
    return({
        type: "SELECT_PLAYER",
        player: player
    })
}