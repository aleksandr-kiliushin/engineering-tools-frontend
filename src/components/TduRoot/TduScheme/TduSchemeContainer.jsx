import React from 'react';
import TduScheme from './TduScheme';
import { connect } from 'react-redux';
import { switchAirVent, switchAptTypeDn, switchIsBrackets, switchBranchBalansTypeDn, switchBvAndFilterDn,
  switchHeatMetersType, switchPartnerTypeDn } from '../../../redux/tduRoot-reducer';
import { getAptTypeDnSelector, getBranchBalansTypeDnSelector, getBvAndFilterDnSelector, getHeatMetersTypeSelector, getPartnerTypeDnSelector } from '../../../redux/tduRoot-selectors';

class TduSchemeContainer extends React.Component {
  render = () => {
    return(
      <TduScheme
        airVent={this.props.airVent}
        aptTypeDn={this.props.aptTypeDn}
        bvAndFilterDn={this.props.bvAndFilterDn}
        branchBalansTypeDn={this.props.branchBalansTypeDn}
        branchesNum={this.props.branchesNum}
        heatMetersLoc={this.props.heatMetersLoc}
        heatMetersType={this.props.heatMetersType}
        isAddInputFilter={this.props.isAddInputFilter}
        isBrackets={this.props.isBrackets}
        isBox={this.props.isBox}
        isDrainageBranch={this.props.isDrainageBranch}
        isPartner={this.props.isPartner}
        partnerTypeDn={this.props.partnerTypeDn}
        side={this.props.side}

        switchAirVent={this.props.switchAirVent}
        switchAptTypeDn={this.props.switchAptTypeDn}
        switchIsBrackets={this.props.switchIsBrackets}
        switchBranchBalansTypeDn={this.props.switchBranchBalansTypeDn}
        switchBvAndFilterDn={this.props.switchBvAndFilterDn}
        switchHeatMetersType={this.props.switchHeatMetersType}
        switchPartnerTypeDn={this.props.switchPartnerTypeDn}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    airVent: state.tduRoot.airVent,
    aptTypeDn: getAptTypeDnSelector(state),
    bvAndFilterDn: getBvAndFilterDnSelector(state),
    branchBalansTypeDn: getBranchBalansTypeDnSelector(state),
    branchesNum: state.tduRoot.branchesNum,
    heatMetersType: getHeatMetersTypeSelector(state),
    heatMetersLoc: state.tduRoot.heatMetersLoc,
    isAddInputFilter: state.tduRoot.isAddInputFilter,
    isBrackets: state.tduRoot.isBrackets,
    isBox: state.tduRoot.isBox,
    isDrainageBranch: state.tduRoot.isDrainageBranch,
    isPartner: state.tduRoot.isPartner,
    partnerTypeDn: getPartnerTypeDnSelector(state),
    side: state.tduRoot.side,
  }
}

export default connect(mapStateToProps, {
  switchAirVent,
  switchAptTypeDn,
  switchIsBrackets,
  switchBranchBalansTypeDn,
  switchBvAndFilterDn,
  switchHeatMetersType,
  switchPartnerTypeDn,
})(TduSchemeContainer);