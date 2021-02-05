import React from "react";
import {connect,} from 'react-redux';
import {LinearProgress,} from "@material-ui/core";

import Chart from "./Chart/Chart";
import Scheme from "./Scheme/Scheme";
import {
  changeGeneralParamAC, changeHoveredTargetAC, downloadCircuitCp, getEquipDbDataAndSetStartEquipState, switchModelAC,
} from "../../redux/schemeAndChart-reducer";


class SchemeAndChartContainer extends React.Component {
  componentDidMount() {
    this.props.getEquipDbDataAndSetStartEquipState();
  }

  render() {
    const generalParamsList = Object.values(this.props.generalParams);
    const pulseTubePrice    = this.props.pulseTubePrice;
    const unitsList         = Object.values(this.props.equip);
    const mountedUnitsList  = unitsList.filter((unit) => unit.isMounted);

    const mountedRows = mountedUnitsList.map((unit) => {
      const alias = unit.aliases.alias;

      let additionalPulseTubePrice = 0;
      if      (['downstream1', 'downstream2', 'upstream1', 'upstream2',].includes(alias)) additionalPulseTubePrice += pulseTubePrice;
      else if (['supDpr', 'retDpr',].includes(alias))                                     additionalPulseTubePrice += pulseTubePrice * 2;

      return {
        authority        : (['supCv', 'return',].includes(alias)) ? unit.valve.authority : null,
        controlUnitModel : unit.controlUnit.full_title,
        dp               : unit.valve.dp?.toFixed(2),
        dpMax            : unit.valve.dpMax?.toFixed(2),
        isMounted        : unit.isMounted,
        position         : unit.aliases.position,
        price            : +((unit.valve.price + unit.controlUnit.price + additionalPulseTubePrice).toFixed(2)),
        v                : unit.valve.v?.toFixed(2),
        valveModel       : `${unit.valve.type_title} ${unit.valve.dn}/${unit.valve.kvs}`,
      }
    });

    let totalPrice = 0;
    for (const row of mountedRows) {
      totalPrice += row.price
    };
    totalPrice = totalPrice.toFixed(2);


    const schemeAndChartJsx = (
      <div>
        <Scheme
          dataArrays            = {this.props.dataArrays}
          generalParamsList     = {generalParamsList}
          hoveredTarget         = {this.props.hoveredTarget}
          unitsList             = {unitsList}

          changeGeneralParamAC  = {this.props.changeGeneralParamAC}
          changeHoveredTargetAC = {this.props.changeHoveredTargetAC}
          switchModelAC         = {this.props.switchModelAC}
        />
        <Chart
          hoveredTarget         = {this.props.hoveredTarget}
          mountedRows           = {mountedRows}
          totalPrice            = {totalPrice}

          downloadCircuitCp     = {this.props.downloadCircuitCp}
          changeHoveredTargetAC = {this.props.changeHoveredTargetAC}
        />
      </div>
    );

    return (<>{this.props.isFetching ? <LinearProgress /> : schemeAndChartJsx}</>);
  }
}

const mapStateToProps = (state) => {
  return {
    equip          : state.schemeAndChart.equip,
    generalParams  : state.schemeAndChart.generalParams,
    hoveredTarget  : state.schemeAndChart.hoveredTarget,
    isFetching     : state.schemeAndChart.isFetching,
    pulseTubePrice : state.schemeAndChart.equipDbData?.pulse_tubes[0].price,
  }
}
const mapDispatchToProps = {
  changeGeneralParamAC,
  changeHoveredTargetAC,
  switchModelAC,
  downloadCircuitCp,
  getEquipDbDataAndSetStartEquipState,
};

export default connect(mapStateToProps, mapDispatchToProps)(SchemeAndChartContainer);