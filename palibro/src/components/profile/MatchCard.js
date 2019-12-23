import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Card = styled.div`
    width: 100%;
    display: flex;
    aling-items: center;
    justify-content: space-between;
    margin: 10px auto;
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
        }
    })

    useEffect(() => {
        if(props.classes.support.includes(props.champion)) {
            setStats({
                healing: props.Healing,
                name: {
                    frontline: false,
                    flank: false,
                    damage: false,
                    support: true
                }
            })
        }
        else if(props.classes.damage.includes(props.champion)) {
            setStats({
                damage: props.Damage,
                name: {
                    frontline: false,
                    flank: false,
                    damage: true,
                    support: false
                }
            })
        }
        else if(props.classes.frontline.includes(props.champion)) {
            setStats({
                objective: props.Objective_Assists,
                name: {
                    frontline: true,
                    flank: false,
                    damage: false,
                    support: false
                }
            })
        }
        else {
            setStats({
                kills: props.Kills,
                name: {
                    frontline: false,
                    flank: true,
                    damage: false,
                    support: false
                }
            })
        }

        
    }, [])

    return(
        <>
            {props.winstatus === "Loss" ? 
            <Card className="loss">
                <Status>
                    <h3>{props.winstatus}</h3>
                    <p>{props.champion}</p>
                    
                </Status>

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
        }
    })
}

export default connect(mapStateToProps, {})(MatchCard)