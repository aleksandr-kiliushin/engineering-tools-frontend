import React, { useEffect, useRef } from 'react';
import { drawHeatMeter } from '../../../../../../../common/drawFuncs';
import s from './RetBranchHeatMeter.module.css';

const RetBranchHeatMeter = (props) => {

  const draw = (ctx) => {
    drawHeatMeter(ctx, props.heatMetersType);
  }

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context);
  }, [draw,]);

  const onSwitchHeatMetersType = () => {
    props.switchHeatMetersType();
  }

  let className;
  if (props.heatMetersLoc !== 'branches') {
    className = s.displayNone;
  }

  return(
    <canvas ref={canvasRef} onClick={onSwitchHeatMetersType} className={className}/>
  );
}

export default RetBranchHeatMeter;