import React, {useCallback, useEffect, useRef} from 'react';
import { drawTailVent } from '../../../../../utils/drawFuncs';

const TailVent = (props) => {

  const draw = useCallback((ctx) => {
    drawTailVent(ctx, props.airVent, props.isDrainageBranch);
  }, [props.airVent, props.isDrainageBranch,]);

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