import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addOccurance } from "../../actions/addOccurance";

const Card = styled.div`
    width: 100%;
    display: flex;
    aling-items: center;
    justify-content: space-between;
    margin: 10px auto;

    div {
        padding: 5px;

        h3,p {
            margin: 0;
        }
    }
`

const Status = styled.div`
    width: 20%;
`

const Stats = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const MatchCard = (props) => {
    const [stats, setStats] = useState({
        kills: 0,
        healing: 0,
        damage: 0,
        objective: 0,
        name: {
            frontline: false,
            flank: false,
            damage: false,
            support: false
        },
        class: ""
    })

    useEffect(() => {        
        if(props.classes.support.includes(props.champion)) {
            setStats({
                ...stats,
                healing: props.Healing,
                name: {
                    frontline: false,
                    flank: false,
                    damage: false,
                    support: true
                },
                class: "Support"
            })
        }
        else if(props.classes.damage.includes(props.champion)) {
            setStats({
                ...stats,
                damage: props.Damage,
                name: {
                    frontline: false,
                    flank: false,
                    damage: true,
                    support: false
                },
                class: "Damage"
            })
        }
        else if(props.classes.frontline.includes(props.champion)) {
            setStats({
                ...stats,
                objective: props.Objective_Assists,
                name: {
                    frontline: true,
                    flank: false,
                    damage: false,
                    support: false
                },
                class: "Frontline"
            })
        }
        else {
            setStats({
                ...stats,
                kills: props.Kills,
                name: {
                    frontline: false,
                    flank: true,
                    damage: false,
                    support: false
                },
                class: "Flank"
            })
        }
    }, [])

    const classSelect = () => {
        switch(stats.class) {
            case "Support":
                return(
                    <div>
                        <p>Healing</p>
                        <p>{props.healing}</p>
                    </div>
                )
            case "Frontline":
                return(
                    <div>
                        <p>Objective Time</p>
                        <p>{props.objective}</p>
                    </div>
                )
            case "Flank":
                return(
                    <div>
                        <p>Kills</p>
                        <p>{props.kills}</p>
                    </div>
                )
            case "Damage":
                return(
                    <div>
                        <p>Damage</p>
                        <p>{props.damage}</p>
                    </div>
                )
            default:
                return null;
        }
    }

    return(
        <>
            {props.winstatus === "Loss" ? 
            <Card className="loss">
                <Status>
                    <h3>{props.winstatus}</h3>
                    <p>{props.champion}</p>
                </Status>

                {classSelect()}

                <Stats>
                    <p>KDA</p>
                    <p>{props.kills}/{props.deaths}/{props.assists}</p>
                </Stats>
            </Card> :
            <Card className="win">
                <Status>
                    <h3>{props.winstatus}</h3>
                    <p>{props.champion}</p>
                </Status>

                {classSelect()}

                <Stats>
                    <p>KDA</p>
                    <p>{props.kills}/{props.deaths}/{props.assists}</p>
                </Stats>
            </Card>}
        </>
    )
}

const mapStateToProps = (state) => {
    return({
        ...state,
        match_history: [state.match_history],
        classes: {
            support: state.classes.support,
            damage: state.classes.damage,
            frontline: state.classes.frontline,
            flank: state.classes.flank
        },
        role_occurance: state.role_occurance
    })
}

export default connect(mapStateToProps, {addOccurance})(MatchCard)