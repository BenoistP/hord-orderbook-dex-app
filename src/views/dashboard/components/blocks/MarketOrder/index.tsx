import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs, resetIdCounter } from 'react-tabs';
import MarketOrderAction from '../../../../../components/general/MarketOrderAction';
import * as S from './styles';

const MarketOrder = ({
  setOpenOrder,
  validAccount,
  blockchainApi,
  setActiveIndex,
}) => {
  const [orderType, setOrderType] = useState('Limit Order'); // currently implementation has market and limit order

  resetIdCounter();

  return (
    <S.Section>
      <Tabs>
        <S.Header>
          <TabList>
            <Tab>Buy BTC</Tab>
            <Tab>Sell BTC</Tab>
          </TabList>
        </S.Header>

        <TabPanel>
          <MarketOrderAction
            type="Buy"
            setOpenOrder={setOpenOrder}
            orderType={orderType}
            account={validAccount}
            blockchainApi={blockchainApi}
            setActiveIndex={setActiveIndex}
          />
        </TabPanel>
        <TabPanel>
          <MarketOrderAction
            type="Sell"
            setOpenOrder={setOpenOrder}
            orderType={orderType}
            account={validAccount}
            blockchainApi={blockchainApi}
            setActiveIndex={setActiveIndex}
          />
        </TabPanel>
      </Tabs>
    </S.Section>
  );
};

export default MarketOrder;
