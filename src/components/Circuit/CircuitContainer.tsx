import React from 'react'
import {connect,} from 'react-redux'
import {LinearProgress,} from '@material-ui/core'

import { Chart } from './Chart/Chart'
import {Scheme} from './Scheme/Scheme'
import {
  actions,
  downloadCircuitCp,
  getEquipDbDataAndSetStartEquipState,
} from '../../redux/circuit-reducer'
import { EquipDbData, EquipState, GeneralParamsType, ObjectToSwitch } from '../../types/types'
import { RootState } from '../../redux/store'


type MapStatePropsType = {
  equip          : EquipState
  generalParams  : GeneralParamsType
  hoveredTarget  : string | null
  isFetching     : boolean
  pulseTubePrice : number
}

type MapDispatchPropsType = {
  changeGeneralParam  : (field: string, value: string) => void
  changeHoveredTarget : (target: string | null) => void
  setEquipDbData      : (equipDbData: EquipDbData) => void
  switchModel         : (alias: string, object: ObjectToSwitch, direction: string) => void
  
  downloadCircuitCp                   : any
  getEquipDbDataAndSetStartEquipState : any
}


type PropsType = MapStatePropsType & MapDispatchPropsType

class CircuitContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getEquipDbDataAndSetStartEquipState()
  }

  componentWillUnmount() {
    this.props.setEquipDbData(null)
  }

  render() {
    const generalParamsList = Object.values(this.props.generalParams)
    const pulseTubePrice    = this.props.pulseTubePrice
    const unitsList         = Object.values(this.props.equip)
    const mountedUnitsList  = unitsList.filter((unit) => unit.valve.dp)

    const mountedUnitsTableData = mountedUnitsList.map((unit) => {
      const alias = unit.aliases.alias

      let additionalPulseTubePrice = 0;
      if (['downstream1', 'downstream2', 'upstream1', 'upstream2'].includes(alias)) {
        additionalPulseTubePrice += pulseTubePrice
      } else if (['supDpr', 'retDpr'].includes(alias)) {
        additionalPulseTubePrice += pulseTubePrice * 2
      }

      return {
        alias            : unit.aliases.alias,
        authority        : (['supCv', 'retCv'].includes(alias)) ? unit.valve.authority : null,
        brainModel       : unit.brain.full_title,
        dp               : unit.valve.dp?.toFixed(2),
        dpMax            : unit.valve.dpMax?.toFixed(2),
        isMounted        : unit.valve.dp,
        position         : unit.aliases.position,
        price            : +((unit.valve.price + unit.brain.price + additionalPulseTubePrice).toFixed(2)),
        v                : unit.valve.v?.toFixed(2),
        valveModel       : `${unit.valve.type_title} ${unit.valve.dn}/${unit.valve.kvs}`,
      }
    })

    let totalPrice: number | string = 0
    for (const row of mountedUnitsTableData) totalPrice += row.price
    totalPrice = totalPrice.toFixed(2)


    const schemeAndChartJsx = (
      <div>
        <Scheme
          generalParamsList   = {generalParamsList}
          hoveredTarget       = {this.props.hoveredTarget}
          unitsList           = {unitsList}

          changeGeneralParam  = {this.props.changeGeneralParam}
          changeHoveredTarget = {this.props.changeHoveredTarget}
          switchModel         = {this.props.switchModel}
        />
        <Chart
          hoveredTarget         = {this.props.hoveredTarget}
          mountedUnitsTableData = {mountedUnitsTableData}
          totalPrice            = {totalPrice}

          downloadCircuitCp   = {this.props.downloadCircuitCp}
          changeHoveredTarget = {this.props.changeHoveredTarget}
        />
      </div>
    );

    return (<>{this.props.isFetching ? <LinearProgress /> : schemeAndChartJsx}</>);
  }
}


const mapStateToProps = (state: RootState): MapStatePropsType => {
  return {
    equip          : state.circuit.equip,
    generalParams  : state.circuit.generalParams,
    hoveredTarget  : state.circuit.hoveredTarget,
    isFetching     : state.circuit.isFetching,
    pulseTubePrice : state.circuit.equipDbData?.pulse_tubes[0].price || 999999,
  }
}


const mapDispatchToProps: MapDispatchPropsType = {
  ...actions,
  downloadCircuitCp,
  getEquipDbDataAndSetStartEquipState,
};


export default connect
  <MapStatePropsType, MapDispatchPropsType, null, RootState>
  (mapStateToProps, mapDispatchToProps)(CircuitContainer);