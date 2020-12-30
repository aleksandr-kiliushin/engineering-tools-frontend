import React, { useEffect, useRef } from 'react';
import { drawControlBtn } from '../../../../utils/drawFuncs';
import s from './TduControl.module.css';

const TduControl = (props) => {

  const canvasAddBranchBtnRef = useRef(null);
  const canvasRemoveBranchBtnRef = useRef(null);
  const canvasSwitchHeatMetersLocBtnRef = useRef(null);
  const canvasSwitchIsAddInputFilterBtnRef = useRef(null);
  const canvasSwitchIsBoxBtnRef = useRef(null);
  const canvasSwitchIsDrainageBranchBtnRef = useRef(null);
  const canvasSwitchIsPartnerBtnRef = useRef(null);
  const canvasSwitchSideBtnRef = useRef(null);

  const drawAddBranchBtn = (ctx) => {drawControlBtn(ctx, 'addBranch');}
  const drawRemoveBranchBtn = (ctx) => {drawControlBtn(ctx, 'removeBranch');}
  const drawSwitchHeatMetersLocBtn = (ctx) => {drawControlBtn(ctx, 'switchHeatMetersLoc');}
  const drawSwitchIsAddInputFilterBtn = (ctx) => {drawControlBtn(ctx, 'switchIsAddInputFilter');}
  const drawSwitchIsBoxBtn = (ctx) => {drawControlBtn(ctx, 'switchIsBox');}
  const drawSwitchIsDrainageBranchBtn = (ctx) => {drawControlBtn(ctx, 'switchIsDrainageBranch');}
  const drawSwitchIsPartnerBtn = (ctx) => {drawControlBtn(ctx, 'switchIsPartner');}
  const drawSwitchSideBtn = (ctx) => {drawControlBtn(ctx, 'switchSide');}


  useEffect(() => {

    const canvasAddBranchBtn = canvasAddBranchBtnRef.current;
    const contextAddBranchBtn = canvasAddBranchBtn.getContext('2d');

    const canvasRemoveBranchBtn = canvasRemoveBranchBtnRef.current;
    const contextRemoveBranchBtn = canvasRemoveBranchBtn.getContext('2d');

    const canvasSwitchHeatMetersLocBtn = canvasSwitchHeatMetersLocBtnRef.current;
    const contextSwitchHeatMetersLocBtn = canvasSwitchHeatMetersLocBtn.getContext('2d');

    const canvasSwitchIsAddInputFilterBtn = canvasSwitchIsAddInputFilterBtnRef.current;
    const contextSwitchIsAddInputFilterBtn = canvasSwitchIsAddInputFilterBtn.getContext('2d');

    const canvasSwitchIsBoxBtn = canvasSwitchIsBoxBtnRef.current;
    const contextSwitchIsBoxBtn = canvasSwitchIsBoxBtn.getContext('2d');

    const canvasSwitchIsDrainageBranchBtn = canvasSwitchIsDrainageBranchBtnRef.current;
    const contextSwitchIsDrainageBranchBtn = canvasSwitchIsDrainageBranchBtn.getContext('2d');
    
    const canvasSwitchIsPartnerBtn = canvasSwitchIsPartnerBtnRef.current;
    const contextSwitchIsPartnerBtn = canvasSwitchIsPartnerBtn.getContext('2d');
    
    const canvasSwitchSideBtn = canvasSwitchSideBtnRef.current;
    const contextSwitchSideBtn = canvasSwitchSideBtn.getContext('2d');


    drawAddBranchBtn(contextAddBranchBtn);
    drawRemoveBranchBtn(contextRemoveBranchBtn);
    drawSwitchHeatMetersLocBtn(contextSwitchHeatMetersLocBtn);
    drawSwitchIsAddInputFilterBtn(contextSwitchIsAddInputFilterBtn);
    drawSwitchIsBoxBtn(contextSwitchIsBoxBtn);
    drawSwitchIsDrainageBranchBtn(contextSwitchIsDrainageBranchBtn);
    drawSwitchIsPartnerBtn(contextSwitchIsPartnerBtn);
    drawSwitchSideBtn(contextSwitchSideBtn);

  }, [
    drawAddBranchBtn,
    drawRemoveBranchBtn,
    drawSwitchHeatMetersLocBtn,
    drawSwitchIsAddInputFilterBtn,
    drawSwitchIsBoxBtn,
    drawSwitchIsDrainageBranchBtn,
    drawSwitchIsPartnerBtn,
    drawSwitchSideBtn,
  ]);


  const onAddBranch = () => {props.addBranch();}
  const onRemoveBranch = () => {props.removeBranch();}
  const onSwitchHeatMetersLoc = () => {props.switchHeatMetersLoc();}
  const onSwitchIsAddInputFilter = () => {props.switchIsAddInputFilter();}
  const onSwitchIsBox = () => {props.switchIsBox();}
  const onSwitchIsDrainageBranch = () => {props.switchIsDrainageBranch();}
  const onSwitchIsPartner = () => {props.switchIsPartner();}
  const onSwitchSide = () => {props.switchSide();}


  return(
    <div className={s.tduControl}>
      <canvas ref={canvasSwitchSideBtnRef} onClick={onSwitchSide} />
      <canvas ref={canvasRemoveBranchBtnRef} onClick={onRemoveBranch}/>
      <canvas ref={canvasAddBranchBtnRef} onClick={onAddBranch}/>
      <canvas ref={canvasSwitchHeatMetersLocBtnRef} onClick={onSwitchHeatMetersLoc}/>
      <canvas ref={canvasSwitchIsPartnerBtnRef} onClick={onSwitchIsPartner}/>
      <canvas ref={canvasSwitchIsBoxBtnRef} onClick={onSwitchIsBox}/>
      <canvas ref={canvasSwitchIsDrainageBranchBtnRef} onClick={onSwitchIsDrainageBranch}/>
      <canvas ref={canvasSwitchIsAddInputFilterBtnRef} onClick={onSwitchIsAddInputFilter}/>
    </div>
  );

}

export default TduControl;