import React from 'react';
import { connect } from 'react-redux';
import TduBasket from './TduBasket';

class TduBasketContainer extends React.Component {
  render = () => {
    return(
      <TduBasket basketArr={this.props.basketArr} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    basketArr: state.tduRoot.basketArr,
  }
}

export default connect(mapStateToProps, {
  // addBranch,
})(TduBasketContainer);