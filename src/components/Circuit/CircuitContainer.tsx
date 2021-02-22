import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {LinearProgress} from '@material-ui/core'

import { Chart } from './Chart/Chart'
import {Scheme} from './Scheme/Scheme'
import {
  actions,
  downloadCircuitCp,
  getEquipDbDataAndSetStartEquipState,
} from '../../redux/circuit-reducer'
import { EquipAlias, EquipDbData, EquipState, GeneralParamsType, ObjectToSwitch,
  SwitchDirection } from '../../types/types'
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
  switchModel         : (alias: EquipAlias, object: ObjectToSwitch, direction: SwitchDirection) => void

  downloadCircuitCp                   : any
  getEquipDbDataAndSetStartEquipState : any
}
type PropsType = MapStatePropsType & MapDispatchPropsType


const CircuitContainer: React.FC<PropsType> = (props) => {
  
  const {equip, generalParams, isFetching, pulseTubePrice, setEquipDbData,
    getEquipDbDataAndSetStartEquipState} = props

  useEffect(() => {
    getEquipDbDataAndSetStartEquipState()
    return () => {setEquipDbData(null)}
  }, [getEquipDbDataAndSetStartEquipState, setEquipDbData])

  const generalParamsList = Object.values(generalParams)
  const unitsList         = Object.values(equip)
  const mountedUnitsList  = unitsList.filter((unit) => unit.valve.dp)

  const mountedUnitsTableData = mountedUnitsList.map((unit) => {
    const alias = unit.alias

    let additionalPulseTubePrice = 0
    if (['downstream1', 'downstream2', 'upstream1', 'upstream2'].includes(alias)) {
      additionalPulseTubePrice += pulseTubePrice
    } else if (['supDpr', 'retDpr'].includes(alias)) {
      additionalPulseTubePrice += pulseTubePrice * 2
    }

    return {
      alias            : unit.alias,
      authority        : unit.valve.authority,
      brainModel       : unit.brain.full_title,
      dp               : unit.valve.dp?.toFixed(2),
      dpMax            : unit.valve.dpMax?.toFixed(2),
      isMounted        : unit.valve.dp,
      position         : unit.position,
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
        hoveredTarget       = {props.hoveredTarget}
        unitsList           = {unitsList}

        changeGeneralParam  = {props.changeGeneralParam}
        changeHoveredTarget = {props.changeHoveredTarget}
        switchModel         = {props.switchModel}
      />
      <Chart
        hoveredTarget         = {props.hoveredTarget}
        mountedUnitsTableData = {mountedUnitsTableData}
        totalPrice            = {totalPrice}

        downloadCircuitCp   = {props.downloadCircuitCp}
        changeHoveredTarget = {props.changeHoveredTarget}
      />
    </div>
  );

  return <div>{isFetching ? <LinearProgress /> : schemeAndChartJsx}</div>
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
}


export default connect
  <MapStatePropsType, MapDispatchPropsType, null, RootState>
  (mapStateToProps, mapDispatchToProps)(CircuitContainer)