import React, {useCallback, useEffect, useRef} from 'react';
import s from './RetInputFilter.module.css';
import { drawFilter } from '../../../../../../utils/drawFuncs';

const RetInputFilter = (props) => {
  
  const canvasRef = useRef(null);

  const draw = useCallback((ctx) => {
    drawFilter(ctx, props.bvAndFilterDn);
  }, [props.bvAndFilterDn,]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context);
  }, [draw,]);

  let className;
  props.isAddInputFilter === false ? className = s.displayNone : className = s.retInputFilter;

  const onSwitchBvAndFilterDn = () => {
    props.switchBvAndFilterDn();
  }

  return(
    <canvas ref={canvasRef} className={className} onClick={onSwitchBvAndFilterDn} />
  );
}

export default RetInputFilter;