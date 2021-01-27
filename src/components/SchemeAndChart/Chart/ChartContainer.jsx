import React from 'react';
import {connect,} from 'react-redux';
import Chart from "./Chart";
import {changeHoveredTarget,} from "../../../redux/schemeAndChart-reducer";

class ChartContainer extends React.Component {
  render() {
    const PULSE_TUBE_PRICE = 45.46;

    const equip            = this.props.equip;
    const rowsFromState = [
      equip.downstream1,
      equip.downstream2,
      equip.supDpr,
      equip.supCv,
      equip.retCv,
      equip.retDpr,
      equip.upstream1,
      equip.upstream2,
    ];

    const UNIT_ALIASES = this.props.UNIT_ALIASES;
    const UNIT_ALIASES_ARR = [
      UNIT_ALIASES.downstream1.unit,
      UNIT_ALIASES.downstream2.unit,
      UNIT_ALIASES.supDpr.unit,
      UNIT_ALIASES.supCv.unit,
      UNIT_ALIASES.retCv.unit,
      UNIT_ALIASES.retDpr.unit,
      UNIT_ALIASES.upstream1.unit,
      UNIT_ALIASES.upstream2.unit,
    ];

    const rows = rowsFromState.map((row, i) => {
      let pulseTubePrice;
      if ([0, 1, 6, 7,].includes(i)) {pulseTubePrice = PULSE_TUBE_PRICE;}
      if ([2, 5,].includes(i))       {pulseTubePrice = PULSE_TUBE_PRICE * 2;}

      return {
        alias            : UNIT_ALIASES_ARR[i],
        authority        : ([3, 4,].includes(i)) ? rowsFromState[i].valve.authority : null,
        controlUnitModel : rowsFromState[i].controlUnit.model,
        dp               : rowsFromState[i].valve.dp.toFixed(2),
        dpMax            : rowsFromState[i].valve.dpMax.toFixed(2),
        isMounted        : rowsFromState[i].isMounted,
        position         : rowsFromState[i].position,
        price            : +((rowsFromState[i].valve.price + rowsFromState[i].controlUnit.price + pulseTubePrice).toFixed(2)),
        v                : rowsFromState[i].valve.v.toFixed(2),
        valveModel       : `${rowsFromState[i].valve.type} ${rowsFromState[i].valve.dn}/${rowsFromState[i].valve.kvs}`,
      }
    });

    const mountedRows = rows.filter((row) => row.isMounted);

    let totalPrice = 0;
    for (let row of mountedRows) {totalPrice += row.price;}
    totalPrice = totalPrice.toFixed(2);

    return(
      <Chart
        hoveredTarget={this.props.hoveredTarget}
        totalPrice={totalPrice}
        mountedRows={mountedRows}

        hover={(row) => {this.props.changeHoveredTarget(row.alias)}}
        unhover={() => {this.props.changeHoveredTarget(null)}}
      />
    );
  }

}

const mapStateToProps = (state) => {
  return {
    equip: state.schemeAndChart.equip,
    hoveredTarget: state.schemeAndChart.hoveredTarget,
    UNIT_ALIASES: state.schemeAndChart.ALIASES.UNITS,
  }
}

export default connect(
  mapStateToProps,
  {
    changeHoveredTarget,
  }
)(ChartContainer);