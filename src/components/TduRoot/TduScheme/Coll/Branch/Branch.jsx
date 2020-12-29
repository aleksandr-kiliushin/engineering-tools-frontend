import React from 'react';
import s from './Branch.module.css';
import CollChunk from './CollChunk/CollChunk';
import RetCollBranch from './RetCollBranch/RetCollBranch';

const Branch = (props) => {
  return(
    <div className={s.branch}>
      <div className={s.supCollChunk}><CollChunk/></div>
      <div className={s.retCollChunk}><CollChunk/></div>
      <RetCollBranch
        branchBalansTypeDn={props.branchBalansTypeDn}
        heatMetersLoc={props.heatMetersLoc}
        heatMetersType={props.heatMetersType}
        
        switchBranchBalansTypeDn={props.switchBranchBalansTypeDn}
        switchHeatMetersType={props.switchHeatMetersType}
      />
    </div>
  );
}

export default Branch;