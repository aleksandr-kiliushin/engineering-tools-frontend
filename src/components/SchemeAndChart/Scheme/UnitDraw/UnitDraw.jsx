import React from "react";
import UpAndDownBtnsGroup from "./UpAndDownBtnsGroup/UpAndDownBtnsGroup";
import s from './UnitDraw.module.css';

export default function UnitDraw(props) {

  const position  = props.aliases.position;

  let x;
  if      (['Downstream 1', 'Upstream 2',].includes(position)) {x = 160;}
  else if (['Downstream 2', 'Upstream 1',].includes(position)) {x = 330;}
  else if (['Supply DPR', 'Return DPR',].includes(position))   {x = 505;}
  else if (['Supply CV', 'Return CV',].includes(position))     {x = 695;}

  const y = (['Downstream 1', 'Downstream 2', 'Supply DPR', 'Supply CV',].includes(position)) ? 85 : 280;

  let detailsForPressureRegulator  = null;
  let drive                        = null;
  let secondPulseTube              = null;

  if (['Downstream 1', 'Downstream 2', 'Supply DPR', 'Return DPR', 'Upstream 1', 'Upstream 2',].includes(position)) {
    detailsForPressureRegulator = (
      <g>
        <ellipse className={s.spring}      cx={x+30} cy={y-20} rx='25' ry='10'/>
        <ellipse className={s.spring}      cx={x+30} cy={y-30} rx='25' ry='10'/>
        <ellipse className={s.spring}      cx={x+30} cy={y-40} rx='25' ry='10'/>
        <ellipse className={s.spring}      cx={x+30} cy={y-50} rx='25' ry='10'/>
        <path    className={s.impulseTube} d={`M${x+40},${y-6}c50-10,45,15,45,15`}/>
      </g>
    );

    if (position === 'Supply DPR') {
      secondPulseTube = (<path className={s.impulseTube} d={`M${x+40},79c105-50,60,150,65,210`}/>);
    } else if (position === 'Return DPR') {
      secondPulseTube = (<path className={s.impulseTube} d={`M${x+40},${y-6}c60-10,50-150,50-159`}/>);
    }
  } else if (['Supply CV', 'Return CV',].includes(position)) {
    drive = (<rect x={x+8} y={y-55} className={s.drive} width="45" height="40"/>);
  }

  const strokeWidth = (props.hoveredTarget === position) ? 2 : 1;

  const onMouseEnterHandler = () => {
    props.changeHoveredTargetAC(position);
    setTimeout(() => {props.changeHoveredTargetAC(null)}, 1000);
  }

  return (
    <g opacity={props.isMounted ? 1 : 0.15} strokeWidth={strokeWidth} onMouseEnter={onMouseEnterHandler}>
      <rect    className={s.corpus} x={x+20}  y={y-15}  width="20" height="20"/> {/* Valve corpus stem */}
      <ellipse className={s.corpus} cx={x+30} cy={y+20} rx="35"    ry="20"    /> {/* Valve corpus body */}
      <rect    className={s.corpus} x={x-6}   y={y}     width="10" height="40"/> {/* Valve left flange */}
      <rect    className={s.corpus} x={x+56}  y={y}     width="10" height="40"/> {/* Valve right flange */}
      {detailsForPressureRegulator}
      {drive}
      {secondPulseTube}
      <UpAndDownBtnsGroup x={x} y={y}    objectToSwitch={props.aliases.valve}       switchModelAC={props.switchModelAC} />
      <UpAndDownBtnsGroup x={x} y={y-55} objectToSwitch={props.aliases.controlUnit} switchModelAC={props.switchModelAC} />
    </g>
  );
}