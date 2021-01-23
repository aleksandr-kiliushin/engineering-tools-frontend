import React, {useCallback, useEffect, useRef} from 'react';
import { drawCollChunkAndBrassInsert } from '../../../../../../utils/drawFuncs';

const CollChunk = (props) => {

  const draw = useCallback((ctx) => {
    drawCollChunkAndBrassInsert(ctx);
  }, []);
  
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context);
  }, [draw,]);

  return(
    <canvas ref={canvasRef}/>
  );
}

export default CollChunk;