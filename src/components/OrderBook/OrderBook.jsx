import React from 'react';
import { connect } from 'react-redux';
import Order from './components/Order';
import { nanoid } from 'nanoid';
import './OrderBook.scss';

const OrderBook = (props) => {
  const { orderType } = props;
  const orders = props[orderType];

  return (
    <div className='orderbook'>
      {orders.map((order) => < Order key={nanoid()} order={order} />)}
    </div>
  );
};

OrderBook.defaultProps = {
  championData: null,
};

const mapStateToProps = (state) => ({
  buyOrders: state.orderbook.buyOrders,
  sellOrders: state.orderbook.sellOrders,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook);
