import React, {useCallback, useEffect, useRef} from 'react';
import { drawUnionNutValve } from '../../../../../../utils/drawFuncs';
import s from './RetInputUnionNutValve.module.css';

const RetInputUnionNutValve = (props) => {

  const canvasRef = useRef(null);

  const draw = useCallback((ctx) => {
    drawUnionNutValve(ctx, props.bvAndFilterDn);
  }, [props.bvAndFilterDn,]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context);
  }, [draw,]);

  const onSwitchBvAndFilterDn = () => {
    props.switchBvAndFilterDn();
  }

  return(
    <canvas ref={canvasRef} className={s.retInputUnionNutValve} onClick={onSwitchBvAndFilterDn}/>
  );
}

export default RetInputUnionNutValve;