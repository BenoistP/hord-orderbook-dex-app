import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Tab, TabList, TabPanel, Tabs, resetIdCounter } from 'react-tabs'
import MarketOrderAction from '../../../../../components/general/MarketOrderAction'
import * as S from './styles'

const MarketOrder = ({ setOpenOrder, blockchainApi, setActiveIndex, currentHPoolTokenName }) => {
  const [orderType, setOrderType] = useState('Limit Order') // currently implementation has market and limit order

  resetIdCounter()

  return (
    <S.Section>
      <Tabs>
        <S.Header>
          <TabList>
            <Tab>{`Buy ${currentHPoolTokenName}`}</Tab>
            <Tab>{`Sell ${currentHPoolTokenName}`}</Tab>
          </TabList>
        </S.Header>

        <TabPanel>
          <MarketOrderAction
            type="Buy"
            setOpenOrder={setOpenOrder}
            orderType={orderType}
            blockchainApi={blockchainApi}
            setActiveIndex={setActiveIndex}
          />
        </TabPanel>
        <TabPanel>
          <MarketOrderAction
            type="Sell"
            setOpenOrder={setOpenOrder}
            orderType={orderType}
            blockchainApi={blockchainApi}
            setActiveIndex={setActiveIndex}
          />
        </TabPanel>
      </Tabs>
    </S.Section>
  )
}

const mapStateToProps = (state) => {
  return {
    currentHPoolTokenName: state.tradingPair.currentHPoolToken?.name,
  }
}

export default connect(mapStateToProps)(MarketOrder)
