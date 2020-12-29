import React from 'react';
import TduInfoAndControl from './TduInfoAndControl';
import { connect } from 'react-redux';
import { addBranch, addTduToBasket, removeBranch, switchHeatMetersLoc, switchIsAddInputFilter, switchIsBox, switchIsDrainageBranch,
switchIsPartner, switchSide } from '../../../redux/tduRoot-reducer';
import {getDesignation,} from '../../../redux/tduRoot-selectors';

class TduInfoAndControlContainer extends React.Component {
  render = () => {
    return(
      <TduInfoAndControl
        code={this.props.code}
        designation={this.props.designation}

        addBranch={this.props.addBranch}
        addTduToBasket={this.props.addTduToBasket}
        removeBranch={this.props.removeBranch}
        switchHeatMetersLoc={this.props.switchHeatMetersLoc}
        switchIsAddInputFilter={this.props.switchIsAddInputFilter}
        switchIsBox={this.props.switchIsBox}
        switchIsDrainageBranch={this.props.switchIsDrainageBranch}
        switchIsPartner={this.props.switchIsPartner}
        switchSide={this.props.switchSide}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    designation: getDesignation(state).designation,
    code: getDesignation(state).code,
  }
}

export default connect(mapStateToProps, {
  addBranch,
  addTduToBasket,
  removeBranch,
  switchHeatMetersLoc,
  switchIsAddInputFilter,
  switchIsBox,
  switchIsDrainageBranch,
  switchIsPartner,
  switchSide,
})(TduInfoAndControlContainer);