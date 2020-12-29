import React from "react";
import s from './Scheme.module.css';
import ParamInputField from "./ParamInputField/ParamInputField";
import UnitDraw from "./UnitDraw/UnitDraw";


const Scheme = (props) => {

  const areMounted = props.areMounted;
  const GENERAL_INPUT_PARAM_FIELDS = props.ALIASES.GENERAL_INPUT_PARAM_FIELDS;
  const generalParams = props.generalParams;
  const hoveredTarget = props.hoveredTarget;
  const switchModel = props.switchModel;
  const UNITS = props.ALIASES.UNITS;

  const changeGeneralParam = props.changeGeneralParam;
  const changeHoveredTarget = props.changeHoveredTarget;


  return (
    <div className={s.scheme}>
      <svg viewBox="0 0 1000 340">

        {/* supPipe */}
        <rect x='10' y='95' className={s.supPipe} width='830' height='20'/>
        {/* retPipe */}
        <rect x='10' y='290' className={s.retPipe} width='830' height='20'/>
        {/* hex */}
        <g>
          <rect x='830' y='90' className={s.corpus} width='10' height='30'/>
          <rect x='830' y='285' className={s.corpus} width='10' height='30'/>
          <rect x='840' y='65' className={s.corpus} width='130' height='270'/>
        </g>


        {/* Downstream 1 */}
        <UnitDraw
          alias={UNITS.downstream1}
          equipmentType={'pressureRegulator'}
          isMounted={areMounted.downstream1}
          hoveredTarget={hoveredTarget}
          positionToGetY={'sup'}
          switchModel={switchModel}
          x={160}

          changeHoveredTarget={changeHoveredTarget}
        />

        {/* Downstream 2 */}
        <UnitDraw
          alias={UNITS.downstream2}
          equipmentType={'pressureRegulator'}
          isMounted={areMounted.downstream2}
          hoveredTarget={hoveredTarget}
          positionToGetY={'sup'}
          switchModel={switchModel}
          x={330}

          changeHoveredTarget={changeHoveredTarget}
        />

        {/* Supply DPR */}
        <UnitDraw
          alias={UNITS.supDpr}
          equipmentType={'pressureRegulator'}
          isMounted={areMounted.supDpr}
          hoveredTarget={hoveredTarget}
          isSupDpr={true}
          positionToGetY={'sup'}
          switchModel={switchModel}
          x={505}

          changeHoveredTarget={changeHoveredTarget}
        />

        {/* Supply CV */}
        <UnitDraw
          alias={UNITS.supCv}
          equipmentType={'controlValve'}
          isMounted={areMounted.supCv}
          hoveredTarget={hoveredTarget}
          positionToGetY={'sup'}
          switchModel={switchModel}
          x={695}

          changeHoveredTarget={changeHoveredTarget}
        />

        {/* Return CV */}
        <UnitDraw
          alias={UNITS.retCv}
          equipmentType={'controlValve'}
          isMounted={areMounted.retCv}
          hoveredTarget={hoveredTarget}
          positionToGetY={'ret'}
          switchModel={switchModel}
          x={695}

          changeHoveredTarget={changeHoveredTarget}
        />

        {/* Return DPR */}
        <UnitDraw
          alias={UNITS.retDpr}
          equipmentType={'pressureRegulator'}
          isMounted={areMounted.retDpr}
          hoveredTarget={hoveredTarget}
          isRetDpr={true}
          positionToGetY={'ret'}
          switchModel={switchModel}
          x={505}

          changeHoveredTarget={changeHoveredTarget}
        />

        {/* Upstream 1 */}
        <UnitDraw
          alias={UNITS.upstream1}
          equipmentType={'pressureRegulator'}
          isMounted={areMounted.upstream1}
          hoveredTarget={hoveredTarget}
          positionToGetY={'ret'}
          switchModel={switchModel}
          x={330}

          changeHoveredTarget={changeHoveredTarget}
        />

        {/* Upstream 2 */}
        <UnitDraw
          alias={UNITS.upstream2}
          equipmentType={'pressureRegulator'}
          isMounted={areMounted.upstream2}
          hoveredTarget={hoveredTarget}
          positionToGetY={'ret'}
          switchModel={switchModel}
          x={160}

          changeHoveredTarget={changeHoveredTarget}
        />


        {/*T1*/}
        <ParamInputField
          changeGeneralParam={changeGeneralParam}
          field={GENERAL_INPUT_PARAM_FIELDS.t1}
          placeholder='T1'
          positionToGetY='sup'
          value={generalParams.t1}
          x={10}
        />

        {/*P1*/}
        <ParamInputField
          changeGeneralParam={changeGeneralParam}
          field={GENERAL_INPUT_PARAM_FIELDS.p1}
          placeholder='P1'
          positionToGetY='sup'
          value={generalParams.p1}
          x={90}
        />

        {/*P2*/}
        <ParamInputField
          changeGeneralParam={changeGeneralParam}
          field={GENERAL_INPUT_PARAM_FIELDS.p2}
          placeholder='P2'
          positionToGetY='sup'
          value={generalParams.p2}
          x={255}
        />

        {/*P3*/}
        <ParamInputField
          changeGeneralParam={changeGeneralParam}
          field={GENERAL_INPUT_PARAM_FIELDS.p3}
          placeholder='P3'
          positionToGetY='sup'
          value={generalParams.p3}
          x={430}
        />

        {/*P4*/}
        <ParamInputField
          disabled={true}
          positionToGetY='sup'
          value={generalParams.p4.toFixed(2)}
          x={620}
        />

        {/*P5*/}
        <ParamInputField
          disabled={true}
          positionToGetY='sup'
          value={generalParams.p5.toFixed(2)}
          x={770}
        />

        {/*P6*/}
        <ParamInputField
          disabled={true}
          positionToGetY='ret'
          value={generalParams.p6.toFixed(2)}
          x={770}
        />

        {/*P7*/}
        <ParamInputField
          disabled={true}
          positionToGetY='ret'
          value={generalParams.p7.toFixed(2)}
          x={620}
        />

        {/*P8*/}
        <ParamInputField
          changeGeneralParam={changeGeneralParam}
          field={GENERAL_INPUT_PARAM_FIELDS.p8}
          placeholder='P8'
          positionToGetY='ret'
          value={generalParams.p8}
          x={430}
        />

        {/*P9*/}
        <ParamInputField
          changeGeneralParam={changeGeneralParam}
          field={GENERAL_INPUT_PARAM_FIELDS.p9} placeholder='P9'
          positionToGetY='ret'
          value={generalParams.p9}
          x={255}
        />

        {/*P10*/}
        <ParamInputField
          changeGeneralParam={changeGeneralParam}
          field={GENERAL_INPUT_PARAM_FIELDS.p10}
          placeholder='P10'
          positionToGetY='ret'
          value={generalParams.p10}
          x={90}
        />

        {/*T2*/}
        <ParamInputField
          changeGeneralParam={changeGeneralParam}
          field={GENERAL_INPUT_PARAM_FIELDS.t2}
          placeholder='T2'
          positionToGetY='ret'
          value={generalParams.t2}
          x={10}
        />

        {/*G*/}
        <ParamInputField
          changeGeneralParam={changeGeneralParam}
          field={GENERAL_INPUT_PARAM_FIELDS.g}
          isWide={true}
          placeholder='G'
          positionToGetY='mid'
          value={generalParams.g}
          x={10}
        />

        {/*hexDp*/}
        <ParamInputField
          changeGeneralParam={changeGeneralParam}
          field={GENERAL_INPUT_PARAM_FIELDS.hexDp}
          placeholder='ΔP'
          positionToGetY='mid'
          value={generalParams.hexDp}
          x={880}
        />

      </svg>
    </div>
  );
}

export default Scheme;