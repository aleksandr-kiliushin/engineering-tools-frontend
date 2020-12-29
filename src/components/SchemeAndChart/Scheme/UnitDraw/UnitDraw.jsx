import React from "react";
import UpAndDownBtnsGroup from "./UpAndDownBtnsGroup/UpAndDownBtnsGroup";
import s from './UnitDraw.module.css';

const UnitDraw = (props) => {

  const x = props.x;
  const y = (props.positionToGetY === 'sup') ? 85 : 280;

  let detailsForPressureRegulator = null;
  let driveOrAdditionalImpulseTube = null;

  if (props.equipmentType === 'pressureRegulator') {
    detailsForPressureRegulator = (
      <g>
        <ellipse className={s.spring} cx={x+30} cy={y-20} rx='25' ry='10'/>
        <ellipse className={s.spring} cx={x+30} cy={y-30} rx='25' ry='10'/>
        <ellipse className={s.spring} cx={x+30} cy={y-40} rx='25' ry='10'/>
        <ellipse className={s.spring} cx={x+30} cy={y-50} rx='25' ry='10'/>
        <path className={s.impulseTube} d={`M${x+40},${y-6}c50-10,45,15,45,15`}/>
      </g>
    );

    if (props.isSupDpr) {
      driveOrAdditionalImpulseTube = (<path className={s.impulseTube} d={`M${x+40},79c105-50,60,150,65,210`}/>);
    } else if (props.isRetDpr) {
      driveOrAdditionalImpulseTube = (<path className={s.impulseTube} d={`M${x+40},${y-6}c60-10,50-150,50-159`}/>);
    }

  } else if (props.equipmentType === 'controlValve') {
    driveOrAdditionalImpulseTube = (<rect x={x+8} y={y-55} className={s.drive} width='45' height='40'/>);
  }

  const strokeWidth = (props.hoveredTarget === props.alias.unit) ? 2 : 1;

  const onMouseEnterHandler = () => {
    props.changeHoveredTarget(props.alias.unit);
    setTimeout(() => {props.changeHoveredTarget(null)}, 1000);
  }

  return (
    <g opacity={props.isMounted ? 1 : 0.15} strokeWidth={strokeWidth} onMouseEnter={onMouseEnterHandler}>
      <rect className={s.corpus} x={x+20} y={y-15} width='20' height='20'/>  {/* Valve corpus stem */}
      <ellipse className={s.corpus} cx={x+30} cy={y+20} rx='35' ry='20'/>    {/* Valve corpus body */}
      <rect className={s.corpus} x={x-6} y={y} width='10' height='40'/>      {/* Valve left flange */}
      <rect className={s.corpus} x={x+56} y={y} width='10' height='40'/>     {/* Valve right flange */}
      {detailsForPressureRegulator}
      {driveOrAdditionalImpulseTube}
      <UpAndDownBtnsGroup x={x} y={y} objectToSwitch={props.alias.valve} switchModel={props.switchModel} />           {/* Control button group for valve */}
      <UpAndDownBtnsGroup x={x} y={y-55} objectToSwitch={props.alias.controlUnit} switchModel={props.switchModel} />  {/* Control button group for control unit */}
    </g>
  );
}

export default UnitDraw;