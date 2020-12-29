import React from 'react';
import Scheme from './Scheme';
import { connect } from 'react-redux';
import {changeGeneralParam, changeHoveredTarget, switchModel} from "../../../redux/schemeAndChart-reducer";

class SchemeContainer extends React.Component {
  render() {
    return(
      <Scheme
        ALIASES={this.props.ALIASES}
        areMounted={this.props.areMounted}
        generalParams={this.props.generalParams}
        hoveredTarget={this.props.hoveredTarget}

        changeGeneralParam={this.props.changeGeneralParam}
        changeHoveredTarget={this.props.changeHoveredTarget}
        switchModel={this.props.switchModel}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ALIASES: state.schemeAndChart.ALIASES,
    areMounted: {
      downstream1: state.schemeAndChart.equip.downstream1.isMounted,
      downstream2: state.schemeAndChart.equip.downstream2.isMounted,
      supDpr: state.schemeAndChart.equip.supDpr.isMounted,
      supCv: state.schemeAndChart.equip.supCv.isMounted,
      retCv: state.schemeAndChart.equip.retCv.isMounted,
      retDpr: state.schemeAndChart.equip.retDpr.isMounted,
      upstream1: state.schemeAndChart.equip.upstream1.isMounted,
      upstream2: state.schemeAndChart.equip.upstream2.isMounted,
    },
    generalParams: state.schemeAndChart.generalParams,
    hoveredTarget: state.schemeAndChart.hoveredTarget,
  }
}

export default connect(mapStateToProps, {
  changeGeneralParam,
  changeHoveredTarget,
  switchModel,
})(SchemeContainer);