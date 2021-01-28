import React from 'react';
import {connect,} from 'react-redux';
import Chart from "./Chart";
import {changeHoveredTargetAC,} from "../../../redux/schemeAndChart-reducer";

class ChartContainer extends React.Component {
  render() {
    const pulseTubePrice = this.props.pulseTubePrice;

    const equip = this.props.equip;
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

    const rows = rowsFromState.map((row, i) => {
      let additionalPulseTubePrice = 0;
      if ([0, 1, 6, 7,].includes(i)) {additionalPulseTubePrice += pulseTubePrice;}
      if ([2, 5,].includes(i))       {additionalPulseTubePrice += pulseTubePrice * 2;}

      return {
        authority        : ([3, 4,].includes(i)) ? rowsFromState[i].valve.authority : null,
        controlUnitModel : rowsFromState[i].controlUnit.model,
        dp               : rowsFromState[i].valve.dp.toFixed(2),
        dpMax            : rowsFromState[i].valve.dpMax.toFixed(2),
        isMounted        : rowsFromState[i].isMounted,
        position         : rowsFromState[i].aliases.position,
        price            : +((rowsFromState[i].valve.price + rowsFromState[i].controlUnit.price + additionalPulseTubePrice).toFixed(2)),
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
        mountedRows={mountedRows}
        totalPrice={totalPrice}

        hover={(row) => {this.props.changeHoveredTargetAC(row.position)}}
        unhover={() => {this.props.changeHoveredTargetAC(null)}}
      />
    );
  }

}

const mapStateToProps = (state) => {
  return {
    equip: state.schemeAndChart.equip,
    hoveredTarget: state.schemeAndChart.hoveredTarget,
    pulseTubePrice: state.schemeAndChart.pulseTubePrice,
  }
}

export default connect(
  mapStateToProps,
  {
    changeHoveredTargetAC,
  }
)(ChartContainer);