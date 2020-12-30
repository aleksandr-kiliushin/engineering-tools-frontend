import React, { useEffect, useRef } from 'react';
import { drawUnionNutValve } from '../../../../../../utils/drawFuncs';
import s from './SupInputUnionNutValve.module.css';

const SupInputUnionNutValve = (props) => {

  const canvasRef = useRef(null);

  const draw = (ctx) => {
    drawUnionNutValve(ctx, props.bvAndFilterDn);
  }
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context);
  }, [draw,]);

  const onSwitchBvAndFilterDn = () => {
    props.switchBvAndFilterDn();
  }

  return(
    <canvas ref={canvasRef} className={s.supInputUnionNutValve} onClick={onSwitchBvAndFilterDn} />
  );
}

export default SupInputUnionNutValve;