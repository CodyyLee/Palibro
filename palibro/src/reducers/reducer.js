import {searchPlayer} from "../actions/searchPlayer";
import {createSignature} from "../actions/createSignature";
import {setSession} from "../actions/session";
import {selectPlayer} from "../actions/selectPlayer";

export const initialState = {
    results: [],
    player: {},
    match_history: [],
    session: {
        id: "",
        time: "",
        oldTime: ""
    },
    signature: "",
    devId: "3369",
    devKey: "EE1873973110453D8CD0CE2A51E86D24"
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "SEARCH_PLAYER":
            return ({
                ...state,
                results: action.results 
            })
        case "SELECT_PLAYER":
            return({
                ...state,
                player: action.player
            })
        case "MATCH_HISTORY":
            console.log(action.payload)
            return({
                ...state,
                match_history: action.payload.map((match) => {
                    return match
                })
            })
        case "SIGNATURE":
            return({
                ...state,
                signature: action.payload
            })
        case "SESSION_ID":
            if(state.session.id === "") {
                return({
                    ...state,
                    session: {
                        id: action.id,
                        time: action.time
                    }
                })
            }
            else {
                if((state.session.time - action.time) / 60000 >= 15){
                    return ({
                        ...state,
                        session: {
                            id: action.id,
                            time: action.time
                        }
                    })
                }
                else {
                    return state
                }
            }
        default:
            return state;
    }
}