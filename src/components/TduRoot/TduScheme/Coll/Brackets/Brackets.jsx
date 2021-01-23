import React, {useCallback, useEffect, useRef} from 'react';
import { drawBrackets } from '../../../../../utils/drawFuncs';

const Brackets = (props) => {

  const draw = useCallback((ctx) => {
    drawBrackets(ctx, props.isBrackets, props.isTail);
  }, [props.isBrackets, props.isTail,]);

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context);
  }, [draw,]);

  const onswitchIsBrackets = () => {
    // props.switchIsBrackets(); // Comment if you don't want to consumers know this option.
  }

  return(
    <canvas ref={canvasRef} onClick={onswitchIsBrackets}/>
  );
}

export default Brackets;