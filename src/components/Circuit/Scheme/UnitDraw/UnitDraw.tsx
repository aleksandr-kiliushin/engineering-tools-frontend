import React from 'react'
import UpAndDownBtnsGroup from './UpAndDownBtnsGroup'
import {makeStyles} from '@material-ui/core'
import { EquipAlias, ObjectToSwitch, SwitchDirection } from '../../../../types/types'


const useStyles = makeStyles({
  corpusAndSpring : {fill: '#6d6d6d', stroke: '#000000'},
  actuator        : {fill: '#eeeeee', stroke: '#000000'},
  impulseTube     : {fill: 'none',    stroke: '#000000'},
});


type PropsType = {
  alias               : EquipAlias
  hoveredTarget       : string | null
  isMounted           : number
  switchModel         : (alias: EquipAlias, object: ObjectToSwitch, direction: SwitchDirection) => void
  changeHoveredTarget : (target: string | null) => void
}


const UnitDraw: React.FC<PropsType> = ({alias, hoveredTarget, isMounted, changeHoveredTarget, switchModel}) => {

  const s = useStyles()

  let x = 0
  if      (['downstream1', 'upstream2'].includes(alias)) x = 160
  else if (['downstream2', 'upstream1'].includes(alias)) x = 330
  else if (['supDpr',      'retDpr'   ].includes(alias)) x = 505
  else if (['supCv',       'retCv'    ].includes(alias)) x = 695

  const y = (['downstream1', 'downstream2', 'supDpr', 'supCv'].includes(alias)) ? 85 : 280

  let detailsForPressureRegulator  = null
  let drive                        = null
  let secondPulseTube              = null

  if (['downstream1', 'downstream2', 'supDpr', 'retDpr', 'upstream1', 'upstream2'].includes(alias)) {
    detailsForPressureRegulator = (
      <g>
        <ellipse className={s.corpusAndSpring} cx={x+30} cy={y-20} rx="25" ry="10"    />
        <ellipse className={s.corpusAndSpring} cx={x+30} cy={y-30} rx="25" ry="10"    />
        <ellipse className={s.corpusAndSpring} cx={x+30} cy={y-40} rx="25" ry="10"    />
        <ellipse className={s.corpusAndSpring} cx={x+30} cy={y-50} rx="25" ry="10"    />
        <path    className={s.impulseTube}       d={`M${x+40},${y-6}c50-10,45,15,45,15`}/>
      </g>
    );

    if (alias === 'supDpr') {
      secondPulseTube = <path className={s.impulseTube} d={`M${x+40},79c105-50,60,150,65,210`} />
    } else if (alias === 'retDpr') {
      secondPulseTube = <path className={s.impulseTube} d={`M${x+40},${y-6}c60-10,50-150,50-159`} />
    }
  } else if (['supCv', 'retCv'].includes(alias)) {
    drive = <rect x={x+8} y={y-55} className={s.actuator} width="45" height="40" />
  }

  const strokeWidth = (hoveredTarget === alias) ? 2 : 1;

  const onMouseEnterHandler = () => {
    changeHoveredTarget(alias)
    setTimeout(() => {changeHoveredTarget(null)}, 1000)
  }

  return (
    <g opacity={isMounted ? 1 : 0.15} strokeWidth={strokeWidth} onMouseEnter={onMouseEnterHandler}>
      <rect    className={s.corpusAndSpring} x={x+20}  y={y-15}  width="20" height="20" /> {/* Valve corpus stem */}
      <ellipse className={s.corpusAndSpring} cx={x+30} cy={y+20} rx   ="35" ry    ="20" /> {/* Valve corpus body */}
      <rect    className={s.corpusAndSpring} x={x-6}   y={y}     width="10" height="40" /> {/* Valve left flange */}
      <rect    className={s.corpusAndSpring} x={x+56}  y={y}     width="10" height="40" /> {/* Valve right flange */}
      {detailsForPressureRegulator}
      {drive}
      {secondPulseTube}
      <UpAndDownBtnsGroup alias={alias} object="valve" switchModel={switchModel} x={x} y={y}    />
      <UpAndDownBtnsGroup alias={alias} object="brain" switchModel={switchModel} x={x} y={y-55} />
    </g>
  )
}

export default React.memo(UnitDraw)