import React, { useEffect, useRef } from 'react';
import { drawHeatMeter } from "../../../../../../common/drawFuncs";
import s from './RetInputHeatMeter.module.css';

const RetInputHeatMeter = (props) => {

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

  let heatMeterClassName;
  if (props.heatMetersLoc !== 'input') {
    heatMeterClassName = s.displayNone;
  } else {
    props.side === 'left' ? heatMeterClassName = s.heatMeterToHorLeft : heatMeterClassName = s.heatMeterToHorRight;    
  }


  return(
    <div className={heatMeterClassName} onClick={onSwitchHeatMetersType} >
      <canvas ref={canvasRef}/>
    </div>
  );
}

export default RetInputHeatMeter;