import React from "react";
import s from './Scheme.module.css';
import ParamInputField from "./ParamInputField/ParamInputField";
import UnitDraw from "./UnitDraw/UnitDraw";


export default function Scheme(props) {

  const unitDraws = props.unitsList.map((unit) => {
    return (
      <UnitDraw
        aliases               = {unit?.aliases}
        hoveredTarget         = {props.hoveredTarget}
        isMounted             = {unit.isMounted}
        key                   = {unit.aliases.position}

        changeHoveredTargetAC = {props.changeHoveredTargetAC}
        switchModelAC         = {props.switchModelAC}
      />
    );
  });


  const inputFieldDraws = props.generalParamsList.map((param) => {
    return (
      <ParamInputField key={param.alias} param={param} changeGeneralParamAC={props.changeGeneralParamAC} />
    );
  });


  return (
      <div className={s.scheme}>
        <svg viewBox="0 0 1000 340">
          {/* supPipe, retPipe, hex */}
          <rect x="10" y="95"  className={s.supPipe} width="830" height="20"/>
          <rect x="10" y="290" className={s.retPipe} width="830" height="20"/>
          <g>
            <rect x="830" y="90"  className={s.corpus}  width="10"  height="30" />
            <rect x="830" y="285" className={s.corpus}  width="10"  height="30" />
            <rect x="840" y="65"  className={s.corpus}  width="130" height="270"/>
          </g>
          {unitDraws}
          {inputFieldDraws}
        </svg>
      </div>
  );
}