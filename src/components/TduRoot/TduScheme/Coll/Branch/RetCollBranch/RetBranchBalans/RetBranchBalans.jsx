import React, { useEffect, useRef } from 'react';
import { drawBranchBalans } from '../../../../../../../utils/drawFuncs';

const RetBranchBalans = (props) => {

  const draw = (ctx) => {
    drawBranchBalans(ctx, props.branchBalansTypeDn);
  }

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context);
  }, [draw,]);

  const onswitchBranchBalansTypeDn = () => {
    props.switchBranchBalansTypeDn();
  }

  return(
    <canvas ref={canvasRef} onClick={onswitchBranchBalansTypeDn}/>
  );
}

export default RetBranchBalans;