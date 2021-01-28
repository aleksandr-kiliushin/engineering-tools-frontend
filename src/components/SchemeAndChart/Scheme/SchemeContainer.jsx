import React from 'react';
import Scheme from './Scheme';
import {connect,} from 'react-redux';
import {changeGeneralParamAC, changeHoveredTargetAC, switchModelAC,} from "../../../redux/schemeAndChart-reducer";
import {getGeneralParamsListSelector, getUnitsListSelector,} from "../../../redux/schemeAndChart-selectors";

class SchemeContainer extends React.Component {
  render() {
    return(
      <Scheme
        generalParamsList     = {this.props.generalParamsList}
        hoveredTarget         = {this.props.hoveredTarget}
        unitsList             = {this.props.unitsList}

        changeGeneralParamAC  = {this.props.changeGeneralParamAC}
        changeHoveredTargetAC = {this.props.changeHoveredTargetAC}
        switchModelAC         = {this.props.switchModelAC}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    generalParamsList : getGeneralParamsListSelector(state),
    hoveredTarget     : state.schemeAndChart.hoveredTarget,
    unitsList         : getUnitsListSelector(state),
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