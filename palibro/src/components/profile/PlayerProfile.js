import React, {useEffect} from "react";
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

const Name = styled.div`

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

`

const Matches = styled.div`
    width: 100%;
`

const PlayerProfile = (props) => {
    console.log(props.player)

    const WL = (props.player[0].Wins / (Number(props.player[0].Wins) + Number(props.player[0].Losses)) * 100);
    console.log(WL)

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
            </ScoreCard>

            <Matches>
                {props.match_history.map((match) => {
                    return <MatchCard winstatus={match.Win_Status}/>
                })}
            </Matches>
        </Container>
    )
}

const mapStateToProps = state => {
    return({
        ...state,
        player: state.player,
        match_history: state.match_history
    })
}

export default connect(mapStateToProps, {})(PlayerProfile);