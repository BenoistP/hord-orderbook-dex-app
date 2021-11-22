import React from 'react';
import { connect } from 'react-redux';
import './Order.scss';

const Order = (props) => {
  const {  } = props;

  return (
    <div className='header-wrapper'>
    </div>
  );
};

Order.defaultProps = {
  championData: null,
};

const mapStateToProps = (state) => ({
  buyOrders: state.orderbook.buyOrders,
  sellOrders: state.orderbook.sellOrders,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
