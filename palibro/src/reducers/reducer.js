import {searchPlayer} from "../actions/searchPlayer";
import {createSignature} from "../actions/createSignature";
import {setSession} from "../actions/session";
import {selectPlayer} from "../actions/selectPlayer";
import {addOccurance} from "../actions/addOccurance";

export const initialState = {
    results: [],
    player: {},
    match_history: [],
    champions: [],
    classes: {
        support: ["Furia", "Grohk", "Grover", "Pip", "Seris", "Ying", "Io", "Jenos", "Mal'Damba"],
        damage: ["Bomb King", "Cassie", "Dredge", "Lian", "Sha Lin", "Strix", "Willo", "Drogoz", "Tyra", "Imani", "Victor", "Kinessa", "Vivian"],
        flank: ["Androxus", "Buck", "Evie", "Moji", "Skye", "Talus", "Koga", "Lex", "Maeve", "Zhin"],
        frontline: ["Ash", "Atlas", "Barik", "Fernando", "Inara", "Makoa", "Raum", "Ruckus", "Terminus", "Khan", "Torvald"]
    },
    role_occurance: {
        support: {
            count: 0,
            healing: 0
        },
        damage: {
            count: 0,
            damage: 0
        },
        flank: {
            count: 0,
            kills: 0
        },
        frontline: {
            count: 0,
            objective: 0
        }
    },
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
        case "ADD_OCCURANCE":
            if(action.role === "Support") {
                return({
                    ...state,
                    role_occurance: {
                        ...state.role_occurance,
                        support: {
                            count: state.role_occurance.support.count += 1,
                            healing: state.role_occurance.support.healing += action.total
                        }
                    }
                })
            }
            else if(action.role === "Frontline") {
                return({
                    ...state,
                    role_occurance: {
                        ...state.role_occurance,
                        frontline: {
                            count: state.role_occurance.frontline.count += 1,
                            objective: state.role_occurance.frontline.objective += action.total
                        }
                    }
                })
            }
            else if(action.role === "Flank") {
                return({
                    ...state,
                    role_occurance: {
                        ...state.role_occurance,
                        flank: {
                            count: state.role_occurance.flank.count += 1,
                            kills: state.role_occurance.flank.kills += action.total
                        }
                    }
                })
            }
            else {
                return({
                    ...state,
                    role_occurance: {
                        ...state.role_occurance,
                        damage: {
                            count: state.role_occurance.damage.count += 1,
                            damage: state.role_occurance.damage.damage += action.total
                        }
                    }
                })
            }
        default:
            return state;
    }
}