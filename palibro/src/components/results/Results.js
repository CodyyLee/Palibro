import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import md5 from "md5";

import {selectPlayer} from "../../actions/selectPlayer";
import {matchHistory} from "../../actions/matchHistory";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Card = styled.div`
    width: 90%;
    background-color: #29CDEA;
    color: #501F32;
    display: flex;
    padding: 10px;
    border: 1px solid #326997;
    border-radius: 3px;

    &:hover {
        cursor: pointer;
    }
`

const Results = props => {

    const generateSignature = (method) => {
        return md5(`${props.devId}${method}${props.devKey}${moment.utc().format('YYYYMMDDHHmmss')}`);
    }

    const clickHandler = e => {
        const player = props.results.filter(sel => {
            return sel.Name
        })

        axios.get(`https://cors-anywhere.herokuapp.com/http://api.paladins.com/paladinsapi.svc/getmatchhistoryJson/${props.devId}/${generateSignature("getmatchhistory")}/${props.session.id}/${moment.utc().format('YYYYMMDDHHmmss')}/${player[0].hz_player_name}`)
            .then(res => {
                props.matchHistory(res.data)
            })
            .catch(err => {
                console.log(err);
            })
        props.selectPlayer(player);
        props.history.push("/profile")
    }

    return(
        <Container>
            {props.results.map((player, index) => {
                return (
                    <Card key={index} id={player.hz_player_name} onClick={clickHandler}>
                        <h3>{player.hz_player_name}</h3>
                        <h4>({player.Region})</h4>
                        <h4> Lvl. {player.Level}</h4>
                    </Card>
                )
            })}
        </Container>
    )
}

const mapStateToProps = (state) => {
    return ({
        ...state,
        results: state.results
    })
}

export default connect(mapStateToProps, {selectPlayer, matchHistory})(Results);