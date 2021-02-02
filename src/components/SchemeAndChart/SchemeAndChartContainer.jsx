import React from "react";
import {connect,} from 'react-redux';
import * as axios from "axios";
import {LinearProgress,} from "@material-ui/core";
import {saveAs,} from 'file-saver';

import Chart from "./Chart/Chart";
import Scheme from "./Scheme/Scheme";
import {
  changeGeneralParamAC, changeHoveredTargetAC,
  setEquipDbDataAC,
  setIsFetchingAC, setStartEquipAC,
  switchModelAC,
} from "../../redux/schemeAndChart-reducer";


class SchemeAndChartContainer extends React.Component {
  componentDidMount() {
    this.props.setIsFetchingAC(true);
    axios.get('http://localhost:8000/api/equipments/').then((response) => {
      this.props.setEquipDbDataAC(response.data);
      this.props.setStartEquipAC();
      this.props.setIsFetchingAC(false);
    });
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
      else if (['supDpr', 'supDpr',].includes(alias))                                     additionalPulseTubePrice += pulseTubePrice * 2;

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


    const downloadCp = () => {
      const mountedUnitsCodes = [];
      for (const unit of mountedUnitsList) {
        mountedUnitsCodes.push(unit.valve.code, unit.controlUnit.code)
      };
      axios({
        url: 'http://localhost:8000/api/downloadcp/',
        method: 'POST',
        responseType: 'blob',
        data: mountedUnitsCodes,
      }).then((response) => {
        const blob = new Blob(
          [response.data],
          {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
        );
        saveAs(blob, 'cp.xlsx');
      });
    }


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

          downloadCp            = {downloadCp}
          changeHoveredTargetAC = {this.props.changeHoveredTargetAC}
        />
      </div>
    );

    return (<>{this.props.isFetching ? <LinearProgress /> : schemeAndChartJsx}</>);
  }
}

const mapStateToProps = (state) => ({
  equip          : state.schemeAndChart.equip,
  generalParams  : state.schemeAndChart.generalParams,
  hoveredTarget  : state.schemeAndChart.hoveredTarget,
  isFetching     : state.schemeAndChart.isFetching,
  pulseTubePrice : state.schemeAndChart.equipDbData?.pulse_tubes[0].price,
});
const mapDispatchToProps = {
  changeGeneralParamAC,
  changeHoveredTargetAC,
  setEquipDbDataAC,
  setIsFetchingAC,
  setStartEquipAC,
  switchModelAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(SchemeAndChartContainer);