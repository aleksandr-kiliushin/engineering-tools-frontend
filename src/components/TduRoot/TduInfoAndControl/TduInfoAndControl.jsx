import React from 'react';
import TduControl from './TduControl/TduControl';
import TduInfo from './TduInfo/TduInfo';

const TduInfoAndControl = (props) => {
  return(
    <div>
      <TduInfo code={props.code} designation={props.designation} addTduToBasket={props.addTduToBasket}/>
      <TduControl
        addBranch={props.addBranch}
        removeBranch={props.removeBranch}
        switchHeatMetersLoc={props.switchHeatMetersLoc}
        switchIsAddInputFilter={props.switchIsAddInputFilter}
        switchIsBox={props.switchIsBox}
        switchIsDrainageBranch={props.switchIsDrainageBranch}
        switchIsPartner={props.switchIsPartner}
        switchSide={props.switchSide}
      />
    </div>
  );
}

export default TduInfoAndControl;