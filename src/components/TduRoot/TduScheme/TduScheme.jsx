import Coll from './Coll/Coll';
import Input from './Input/Input';
import s from './TduScheme.module.css';

const TduScheme = (props) => {

  let tduSchemeSideClassName;
  props.side === 'left' ? tduSchemeSideClassName = s.tduSchemeLeft : tduSchemeSideClassName = s.tduSchemeRight;

  let tduSchemeIsBoxClassName;
  props.isBox === false ? tduSchemeIsBoxClassName = s.isBoxFalse : tduSchemeIsBoxClassName = s.isBoxTrue;

  return(
    <div className={tduSchemeIsBoxClassName}>
      <div className={tduSchemeSideClassName}>
        <Input
          aptTypeDn={props.aptTypeDn}
          bvAndFilterDn={props.bvAndFilterDn}
          heatMetersLoc={props.heatMetersLoc}
          heatMetersType={props.heatMetersType}
          isAddInputFilter={props.isAddInputFilter}
          isPartner={props.isPartner}
          partnerTypeDn={props.partnerTypeDn}
          side={props.side}

          switchAptTypeDn={props.switchAptTypeDn}
          switchBvAndFilterDn={props.switchBvAndFilterDn}
          switchHeatMetersType={props.switchHeatMetersType}
          switchPartnerTypeDn={props.switchPartnerTypeDn}
        />
        <Coll
          airVent={props.airVent}
          branchBalansTypeDn={props.branchBalansTypeDn}
          branchesNum={props.branchesNum}
          heatMetersLoc={props.heatMetersLoc}
          heatMetersType={props.heatMetersType}
          isBrackets={props.isBrackets}
          isDrainageBranch={props.isDrainageBranch}
          side={props.side}

          switchAirVent={props.switchAirVent}
          switchIsBrackets={props.switchIsBrackets}
          switchBranchBalansTypeDn={props.switchBranchBalansTypeDn}
          switchHeatMetersType={props.switchHeatMetersType}
        />
      </div>
    </div>
  );
}

export default TduScheme;