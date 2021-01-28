import React from "react";
import s from './Scheme.module.css';
import ParamInputField from "./ParamInputField/ParamInputField";
import UnitDraw from "./UnitDraw/UnitDraw";


const Scheme = (props) => {

  const equip                 = props.equip;
  const generalParams         = props.generalParams;
  const hoveredTarget         = props.hoveredTarget;

  const changeGeneralParamAC  = props.changeGeneralParamAC;
  const changeHoveredTargetAC = props.changeHoveredTargetAC;
  const switchModelAC         = props.switchModelAC;

  const unitsList = [
    equip.downstream1,
    equip.downstream2,
    equip.supDpr,
    equip.supCv,
    equip.retCv,
    equip.retDpr,
    equip.upstream1,
    equip.upstream2,
  ];

  const unitDraws = unitsList.map((unit) => {
    return (
      <UnitDraw
        aliases               = {unit.aliases}
        isMounted             = {unit.isMounted}
        hoveredTarget         = {hoveredTarget}
        key                   = {unit.aliases.position}

        changeHoveredTargetAC = {changeHoveredTargetAC}
        switchModelAC         = {switchModelAC}
      />
    );
  });

  return (
    <div className={s.scheme}>
      <svg viewBox="0 0 1000 340">

        {/* supPipe */}
        <rect x="10" y="95" className={s.supPipe} width="830" height="20"/>
        {/* retPipe */}
        <rect x="10" y="290" className={s.retPipe} width="830" height="20"/>
        {/* hex */}
        <g>
          <rect x='830' y='90' className={s.corpus} width='10' height='30'/>
          <rect x='830' y='285' className={s.corpus} width='10' height='30'/>
          <rect x='840' y='65' className={s.corpus} width='130' height='270'/>
        </g>

        {unitDraws}

        {/*T1*/}
        <ParamInputField
          alias                = {generalParams.t1.alias}
          positionToGetY       = 'sup'
          value                = {generalParams.t1.value}
          x                    = {10}

          changeGeneralParamAC = {changeGeneralParamAC}
        />

        {/*P1*/}
        <ParamInputField
          alias                = {generalParams.p1.alias}
          positionToGetY       = 'sup'
          value                = {generalParams.p1.value}
          x                    = {90}

          changeGeneralParamAC = {changeGeneralParamAC}
        />

        {/*P2*/}
        <ParamInputField
          alias                = {generalParams.p2.alias}
          positionToGetY       = 'sup'
          value                = {generalParams.p2.value}
          x                    = {255}

          changeGeneralParamAC = {changeGeneralParamAC}
        />

        {/*P3*/}
        <ParamInputField
          alias                = {generalParams.p3.alias}
          positionToGetY       = 'sup'
          value                = {generalParams.p3.value}
          x                    = {430}

          changeGeneralParamAC = {changeGeneralParamAC}
        />

        {/*P4*/}
        <ParamInputField
          disabled       = {true}
          positionToGetY = 'sup'
          value          = {generalParams.p4.value.toFixed(2)}
          x              = {620}
        />

        {/*P5*/}
        <ParamInputField
          disabled       = {true}
          positionToGetY = 'sup'
          value          = {generalParams.p5.value.toFixed(2)}
          x              = {770}
        />

        {/*P6*/}
        <ParamInputField
          disabled      = {true}
          positionToGetY= 'ret'
          value         = {generalParams.p6.value.toFixed(2)}
          x             = {770}
        />

        {/*P7*/}
        <ParamInputField
          disabled       = {true}
          positionToGetY = 'ret'
          value          = {generalParams.p7.value.toFixed(2)}
          x              = {620}
        />

        {/*P8*/}
        <ParamInputField
          alias                = {generalParams.p8.alias}
          positionToGetY       = 'ret'
          value                = {generalParams.p8.value}
          x                    = {430}

          changeGeneralParamAC = {changeGeneralParamAC}
        />

        {/*P9*/}
        <ParamInputField
          alias                = {generalParams.p9.alias}
          positionToGetY       = 'ret'
          value                = {generalParams.p9.value}
          x                    = {255}

          changeGeneralParamAC = {changeGeneralParamAC}
        />

        {/*P10*/}
        <ParamInputField
          alias                = {generalParams.p10.alias}
          positionToGetY       = 'ret'
          value                = {generalParams.p10.value}
          x                    = {90}

          changeGeneralParamAC = {changeGeneralParamAC}
        />

        {/* T2 */}
        <ParamInputField
          alias                = {generalParams.t2.alias}
          positionToGetY       = 'ret'
          value                = {generalParams.t2.value}
          x                    = {10}

          changeGeneralParamAC = {changeGeneralParamAC}
        />

        {/* G */}
        <ParamInputField
          alias                = {generalParams.g.alias}
          positionToGetY       = 'mid'
          value                = {generalParams.g.value}
          x                    = {10}

          changeGeneralParamAC = {changeGeneralParamAC}
        />

        {/*hexDp*/}
        <ParamInputField
          alias                = {generalParams.hexDp.alias}
          positionToGetY       = 'mid'
          value                = {generalParams.hexDp.value}
          x                    = {880}

          changeGeneralParamAC = {changeGeneralParamAC}
        />

      </svg>
    </div>
  );
}

export default Scheme;