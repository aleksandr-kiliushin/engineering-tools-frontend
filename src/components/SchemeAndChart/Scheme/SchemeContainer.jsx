import React from 'react';
import Scheme from './Scheme';
import {connect,} from 'react-redux';
import {
  changeGeneralParamAC,
  changeHoveredTargetAC,
  switchModelAC,
} from "../../../redux/schemeAndChart-reducer";


class SchemeContainer extends React.Component {

  render() {
    const generalParamsList = Object.values(this.props.generalParams);
    const unitsList = Object.values(this.props.equip);
    return(
      <Scheme
        dataArrays            = {this.props.dataArrays}
        generalParamsList     = {generalParamsList}
        hoveredTarget         = {this.props.hoveredTarget}
        unitsList             = {unitsList}

        changeGeneralParamAC  = {this.props.changeGeneralParamAC}
        changeHoveredTargetAC = {this.props.changeHoveredTargetAC}
        switchModelAC         = {this.props.switchModelAC}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataArrays    : state.schemeAndChart.dataArrays,
    generalParams : state.schemeAndChart.generalParams,
    hoveredTarget : state.schemeAndChart.hoveredTarget,
    equip         : state.schemeAndChart.equip,
  }
}

export default connect(
  mapStateToProps,
  {
    changeGeneralParamAC,
    changeHoveredTargetAC,
    switchModelAC,
  }
)(SchemeContainer);