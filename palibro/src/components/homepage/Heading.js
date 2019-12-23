import React, {useState} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";
import md5 from "md5";
import moment from "moment";

import img from "../../images/top-banner-fixed.jpg";

import { searchPlayer } from "../../actions/searchPlayer";
import { createSignature } from "../../actions/createSignature";
import { setSession } from "../../actions/session";

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(41, 205, 234, 0.9);
`

const Img = styled.div`
    width: 100%;
    background-image: url(${img});
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`

const Heading = (props) => {

    const [player, setPlayer] = useState("");

    const generateSignature = (method) => {
        return md5(`${props.devId}${method}${props.devKey}${moment.utc().format('YYYYMMDDHHmmss')}`);
    }

    const changeHandler = e => {
        setPlayer(e.target.value);
    }

    const submitHandler = e => {
        e.preventDefault();

        axios.get(`https://cors-anywhere.herokuapp.com/http://api.paladins.com/paladinsapi.svc/getplayerJson/${props.devId}/${generateSignature("getplayer")}/${props.session.id}/${moment.utc().format("YYYYMMDDHHmmss")}/${player}`)
        .then(res => {
            props.searchPlayer(res.data)
            props.history.push("/search_results");
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <Container>
            <Img>
                <div>
                    <h1>Palibro</h1>
                    <h4>Get Started</h4>
                    <form onSubmit={submitHandler}>
                        <input type="text" name="player" id="player" onChange={changeHandler} placeholder="Player Name..." value={player}/>
                        <button type="submit">Search</button>
                    </form>
                </div>
            </Img>
        </Container>
    )
}

export const mapStateToProps = (state) => {
    return ({
        ...state,
        match_history: state.match_history,
        results: state.results,
        player: state.player,
        session: {
            ...state.session,
            id: state.session.id
        }
    })
}

export default connect(mapStateToProps, {
    searchPlayer,
    setSession,
    createSignature
})(Heading);