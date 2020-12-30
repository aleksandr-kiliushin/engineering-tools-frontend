import React, { useEffect, useRef } from 'react';
import { drawApt } from '../../../../../../utils/drawFuncs';
import s from './RetApt.module.css';

const RetApt = (props) => {

  const draw = (ctx) => {
    drawApt(ctx, props.aptTypeDn);
  }

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context);
  }, [draw,]);

  const onswitchApt = () => { props.switchAptTypeDn(); }

  return(
    <canvas ref={canvasRef} className={s.retApt} onClick={onswitchApt} />
  );
}

export default RetApt;