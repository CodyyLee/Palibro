import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";
import md5 from "md5";
import moment from "moment";

import { createSignature } from "../../actions/createSignature";
import { setSession } from "../../actions/session";

import Heading from "./Heading";

const Home = (props) => {

    const generateSignature = (method) => {
        return md5(`${props.devId}${method}${props.devKey}${moment.utc().format('YYYYMMDDHHmmss')}`);
    }

    const [time, setTime] = useState("");
    const [newTime, setNewTime] = useState("");

    useEffect(() => {
        props.createSignature(generateSignature('createsession'))
        
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.paladins.com/paladinsapi.svc/createsessionJson/${props.devId}/${props.signature}/${moment.utc().format('YYYYMMDDHHmmss')}`)
            .then(res => {
                props.setSession(res.data.session_id, Math.floor(new Date()));
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.signature])
    
    return (
        <>
            <Heading  {...props}/>
        </>
    )
}

const mapStateToProps = (state) => {
    return ({
        ...state,
        signature: state.signature,
        session: {
            id: state.session.id,
            time: state.session.time
        }
    })
}

export default connect(mapStateToProps, {
    createSignature,
    setSession
})(Home);