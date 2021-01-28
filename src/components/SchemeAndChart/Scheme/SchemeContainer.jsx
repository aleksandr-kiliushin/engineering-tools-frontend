import React from 'react';
import Scheme from './Scheme';
import {connect,} from 'react-redux';
import {changeGeneralParamAC, changeHoveredTargetAC, switchModelAC,} from "../../../redux/schemeAndChart-reducer";

class SchemeContainer extends React.Component {
  render() {
    return(
      <Scheme
        equip                ={this.props.equip}
        generalParams        ={this.props.generalParams}
        hoveredTarget        ={this.props.hoveredTarget}

        changeGeneralParamAC ={this.props.changeGeneralParamAC}
        changeHoveredTargetAC={this.props.changeHoveredTargetAC}
        switchModelAC        ={this.props.switchModelAC}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    generalParams: state.schemeAndChart.generalParams,
    hoveredTarget: state.schemeAndChart.hoveredTarget,
    equip        : state.schemeAndChart.equip,
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