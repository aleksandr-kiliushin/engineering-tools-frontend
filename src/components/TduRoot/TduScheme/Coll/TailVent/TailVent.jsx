import React, { useEffect, useRef } from 'react';
import { drawTailVent } from '../../../../../common/drawFuncs';

const TailVent = (props) => {

  const draw = (ctx) => {
    drawTailVent(ctx, props.airVent, props.isDrainageBranch);
  }

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context);
  }, [draw,]);


  const onSwitchAirVent = () => {
    props.switchAirVent();
  }

  return(
    <canvas ref={canvasRef} onClick={onSwitchAirVent}/>
  );
}

export default TailVent;