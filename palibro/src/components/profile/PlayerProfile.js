import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import { connect } from "react-redux";

import MatchCard from "./MatchCard";

const Container = styled.div`
    width: 100%;
    padding-top: 10vh;
    background-color: #29CDEA;
`

const Heading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
`

const Level = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        font-size: 3rem;
    }
`

const ScoreCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

const Matches = styled.div`
    width: 90%;
    margin: auto;
    
    div {
        border-radius: 3px;
    }
`

const PlayerProfile = (props) => {
    console.log(props.player)

    const [kda, setKda] = useState({
        kills: 0,
        deaths: 0,
        assists: 0,
        win: 0,
        loss: 0
    })

    useEffect(() => {
        props.match_history.map((match) => {
            setKda({
                kills: kda.kills += match.Kills,
                deaths: kda.deaths += match.Deaths,
                assists: kda.assists += match.Assists
            })

            if(match.Win_Status === "Loss") {
                setKda({
                    ...kda,
                    loss: kda.loss += 1
                })
            }
            else {
                setKda({
                    ...kda,
                    win: kda.win += 1
                })
            }
        })
    }, [props.match_history])

    const WL = (kda.win / (kda.win + kda.loss)) * 100;

    return (
        <Container>
            <Heading>
                <div>
                    <h1>{props.player[0].hz_player_name}</h1>
                    <h3>{props.player[0].Region}</h3>
                </div>
                <Level>
                    <h1>{props.player[0].Level}</h1>
                </Level>
            </Heading>

            <ScoreCard>
                <div>
                    <p>W/L%</p>
                    <p>{WL.toFixed(1)}%</p>
                </div>

                <div>
                    <p>K/D/A</p>
                    <p>{kda.kills / 50}/{kda.deaths / 50}/{kda.assists / 50}</p>
                </div>
            </ScoreCard>

            <Matches>
                {props.match_history.map((match, index) => {
                    return <MatchCard key={index} winstatus={match.Win_Status} champion={match.Champion} kills={match.Kills} deaths={match.Deaths} assists={match.Assists} healing={match.Healing} objective={match.Objective_Assists} damage={match.Damage}/>
                })}
            </Matches>
        </Container>
    )
}

const mapStateToProps = state => {
    return({
        ...state,
        player: state.player,
        match_history: state.match_history,
        add_occurance: state.add_occurance
    })
}

export default connect(mapStateToProps, {})(PlayerProfile);