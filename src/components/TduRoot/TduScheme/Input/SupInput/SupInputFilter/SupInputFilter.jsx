import React, { useEffect, useRef } from 'react';
import { drawFilter } from '../../../../../../utils/drawFuncs';
import s from './SupInputFilter.module.css';

const SupInputFilter = (props) => {

  const canvasRef = useRef(null);

  const draw = (ctx) => {
    drawFilter(ctx, props.bvAndFilterDn);
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
    <canvas ref={canvasRef} className={s.supInputFilter} onClick={onSwitchBvAndFilterDn} />
  );
}

export default SupInputFilter;