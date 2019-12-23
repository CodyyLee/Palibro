import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const MatchCard = (props) => {

    return(
        <>
            {props.winstatus === "Loss" ? 
            <div>
                <h3 style="color: red">{props.winstatus}</h3>
            </div> : 
            <div>
                <h3 style="color: green">{props.winstatus}</h3>
            </div>}
        </>
    )
}

const mapStateToProps = (state) => {
    return({
        ...state,
        match_history: [state.match_history]
    })
}

export default connect()(MatchCard)