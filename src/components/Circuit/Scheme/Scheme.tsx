import React from 'react'
import {ParamInputField} from './ParamInputField/ParamInputField'
import UnitDraw from './UnitDraw/UnitDraw'
import {makeStyles} from '@material-ui/core/styles'
import { EquipAlias, EquipUnitState, GeneralParamType, ObjectToSwitch, SwitchDirection } from '../../../types/types'


const useStyles = makeStyles({
  scheme  : {background: 'lightgray'                           },
  corpus  : {fill: '#6d6d6d', stroke: '#000000', strokeWidth: 1},
  supPipe : {fill: '#BE1622', stroke: '#000000', strokeWidth: 1},
  retPipe : {fill: '#009FE3', stroke: '#000000', strokeWidth: 1},
})


type PropsType = {
  generalParamsList   : GeneralParamType[]
  hoveredTarget       : string | null
  unitsList           : EquipUnitState[]

  changeGeneralParam  : (field: string, value: string) => void
  changeHoveredTarget : (target: string | null) => void
  switchModel         : (alias: EquipAlias, object: ObjectToSwitch, direction: SwitchDirection) => void
}

export const Scheme: React.FC<PropsType> = (props) => {

  const {generalParamsList, hoveredTarget, unitsList, changeGeneralParam, changeHoveredTarget, switchModel} = props

  const s = useStyles()

  const unitDraws = unitsList.map((unit) => (
    <UnitDraw
      alias         = {unit.alias}
      hoveredTarget = {hoveredTarget}
      isMounted     = {unit.valve.dp}
      key           = {unit.alias}

      changeHoveredTarget = {changeHoveredTarget}
      switchModel         = {switchModel}
    />
  ))


  const inputFieldDraws = generalParamsList.map((param) => {
    return <ParamInputField key={param.alias} param={param} changeGeneralParam={changeGeneralParam} />
  });

  return (
      <div className={s.scheme}>
        <svg viewBox="0 0 1000 340">
          {/* supPipe, retPipe, hex */}
          <rect x="10" y="95"  className={s.supPipe} width="830" height="20"/>
          <rect x="10" y="290" className={s.retPipe} width="830" height="20"/>
          <g>
            <rect x="830" y="90"  className={s.corpus}  width="10"  height="30" />
            <rect x="830" y="285" className={s.corpus}  width="10"  height="30" />
            <rect x="840" y="65"  className={s.corpus}  width="130" height="270"/>
          </g>
          {unitDraws}
          {inputFieldDraws}
        </svg>
      </div>
  );
}