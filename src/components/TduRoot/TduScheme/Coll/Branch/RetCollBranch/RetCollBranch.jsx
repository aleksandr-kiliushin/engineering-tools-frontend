import s from './RetCollBranch.module.css';
import RetBranchBalans from './RetBranchBalans/RetBranchBalans';
import RetBranchHeatMeter from './RetBranchHeatMeter/RetBranchHeatMeter';

const RetCollBranch = (props) => {
  return(
    <div className={s.retCollBranch}>
      <RetBranchHeatMeter
        heatMetersType={props.heatMetersType}
        switchHeatMetersType={props.switchHeatMetersType}
        heatMetersLoc={props.heatMetersLoc}
      />
      <RetBranchBalans branchBalansTypeDn={props.branchBalansTypeDn} switchBranchBalansTypeDn={props.switchBranchBalansTypeDn}/>
    </div>
  );
}

export default RetCollBranch;