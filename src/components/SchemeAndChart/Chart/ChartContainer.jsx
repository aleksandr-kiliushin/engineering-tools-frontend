import React from 'react';
import { connect } from 'react-redux';
import Chart from "./Chart";
import {changeHoveredTarget} from "../../../redux/schemeAndChart-reducer";

class ChartContainer extends React.Component {
  render() {
    return(
      <Chart
        equip={this.props.equip}
        hoveredTarget={this.props.hoveredTarget}
        UNITS_ALIASES={this.props.UNITS_ALIASES}

        changeHoveredTarget={this.props.changeHoveredTarget}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    equip: state.schemeAndChart.equip,
    hoveredTarget: state.schemeAndChart.hoveredTarget,
    UNITS_ALIASES: state.schemeAndChart.ALIASES.UNITS,
  }
}

export default connect(mapStateToProps, {
  changeHoveredTarget,
})(ChartContainer);