import React from 'react';
import s from './Coll.module.css';
import Branch from './Branch/Branch';
import Brackets from './Brackets/Brackets';
import TailVent from './TailVent/TailVent';

const Coll = (props) => {

  let branchesClassName;
  if (props.side === 'left') {
    branchesClassName = s.branchesLeft;
  } else if (props.side === 'right') {
    branchesClassName = s.branchesRight;
  }

  const branches = [];
  for (let i = 0; i < props.branchesNum; i++) {
    branches.push(
      <Branch
        key={i}
        branchBalansTypeDn={props.branchBalansTypeDn}
        heatMetersLoc={props.heatMetersLoc}
        heatMetersType={props.heatMetersType}
        
        switchBranchBalansTypeDn={props.switchBranchBalansTypeDn}
        switchHeatMetersType={props.switchHeatMetersType}
      />
    );
  }

  return(
    <div className={s.coll}>
      <Brackets isBrackets={props.isBrackets} isTail={false} switchIsBrackets={props.switchIsBrackets}/>
      <div className={branchesClassName}>{branches}</div>
      <TailVent airVent={props.airVent} switchAirVent={props.switchAirVent} isDrainageBranch={props.isDrainageBranch}/>
      <Brackets isBrackets={props.isBrackets} isTail={true} switchIsBrackets={props.switchIsBrackets}/>
    </div>
  );
}

export default Coll;