import React from 'react';
import {connect,} from 'react-redux';
import Chart from "./Chart";
import {changeHoveredTargetAC,} from "../../../redux/schemeAndChart-reducer";

class ChartContainer extends React.Component {
  render() {
    const pulseTubePrice = this.props.pulseTubePrice;

    const unitsList = Object.values(this.props.equip);

    const unitRows = unitsList.map((unit) => {
      const position = unit.aliases.position;

      let additionalPulseTubePrice = 0;
      if (['Downstream 1', 'Downstream 2', 'Upstream 1', 'Upstream 2',].includes(position)) {
        additionalPulseTubePrice += pulseTubePrice;
      }
      else if (['Supply DPR', 'Return DPR',].includes(position)) {
        additionalPulseTubePrice += pulseTubePrice * 2;
      }

      let controlUnitModel;
      if (['Downstream 1', 'Downstream 2', 'Supply DPR', 'Return DPR', 'Upstream 1', 'Upstream 2',].includes(position)) {
        controlUnitModel = `${unit.controlUnit.type_title} ${unit.controlUnit.setting_range}`;
      } else if (['Supply CV', 'Return CV',].includes(position)) {
        controlUnitModel = `${unit.controlUnit.type_title}/${unit.controlUnit.voltage}/${unit.controlUnit.control_signal}`;
      }

      return {
        authority        : (['Supply CV', 'Return CV',].includes(position)) ? unit.valve.authority : null,
        controlUnitModel : controlUnitModel,
        dp               : unit.valve.dp.toFixed(2),
        dpMax            : unit.valve.dpMax.toFixed(2),
        isMounted        : unit.isMounted,
        position         : unit.aliases.position,
        price            : +((unit.valve.price + unit.controlUnit.price + additionalPulseTubePrice).toFixed(2)),
        v                : unit.valve.v.toFixed(2),
        valveModel       : `${unit.valve.type_title} ${unit.valve.dn}/${unit.valve.kvs}`,
      }
    });

    const mountedRows = unitRows.filter((row) => row.isMounted);

    let totalPrice = 0;
    for (let row of mountedRows) {totalPrice += row.price;}
    totalPrice = totalPrice.toFixed(2);

    return(
      <Chart
        hoveredTarget = {this.props.hoveredTarget}
        mountedRows   = {mountedRows}
        totalPrice    = {totalPrice}

        hover         = {(row) => {this.props.changeHoveredTargetAC(row.position)}}
        unhover       = {() => {this.props.changeHoveredTargetAC(null)}}
      />
    );
  }

}

const mapStateToProps = (state) => {
  return {
    hoveredTarget  : state.schemeAndChart.hoveredTarget,
    pulseTubePrice : state.schemeAndChart.dataArrays && state.schemeAndChart.dataArrays.pulse_tubes[0].price,
    equip          : state.schemeAndChart.equip,
  }
}

export default connect(
  mapStateToProps,
  {
    changeHoveredTargetAC,
  }
)(ChartContainer);