// import React from 'react';
import Contacts from "./Contacts";
import {connect} from "react-redux";
import {setEquipsDbData} from "../../redux/schemeAndChart-reducer";

const mapStateToProps = (state) => {
  return {
    cvValves: state.schemeAndChart.dataArrays.cvValves,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCvValves: (cvValves) => {
      dispatch(setEquipsDbData(cvValves));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);