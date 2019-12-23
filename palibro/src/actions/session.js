export const setSession = (sessionid, start) => {
    return({
        type: "SESSION_ID",
        id: sessionid,
        time: start
    })
}