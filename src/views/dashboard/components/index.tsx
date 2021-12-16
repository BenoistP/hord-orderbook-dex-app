import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

// import { webSocket } from '../../components/dashboard/CustomChart/api/stream'
import Graph from './blocks/Graph'
import MarketOrder from './blocks/MarketOrder'
import Navbar from './blocks/Navbar'
import Transactions from './blocks/Transactions'
import * as S from './styles'
// import Toast from '../../components/general/Toast'
import { setBuyOrders, setSellOrders } from 'store/actions/orderbookActions'
import { connectToCurrentHPoolTokenContract } from 'store/actions/contractActions'
import { setOpenOrders } from 'store/actions/transactionActions'
import { setTradingPairsInformation } from 'store/actions/tradingPairActions'

function Dashboard({
  account,
  blockchainApi,
  setBuyOrders,
  setSellOrders,
  buyOrders,
  sellOrders,
  currentHPoolTokenContract,
  currentHPoolToken,
  connectToCurrentHPoolTokenContract,
  setTradingPairsInformation,
  openOrders,
  setOpenOrders,
}) {
  const [state, setState] = useState(false)
  const [volume, setVolume] = useState(0)
  const [blockPrice, setBlockPrice] = useState('0.00')
  const [high, setHigh] = useState(0)
  const [low, setLow] = useState(0)
  const [lastTradePrice, setLastTradePrice] = useState(0)
  const [lastTradePriceType, setLastTradePriceType] = useState()
  const [newTrade, setNewTrade] = useState()
  const [activeIndex, setActiveIndex] = useState(0)

  const removeTransactionsOrder = (id: string) => console.log('remove transaction' + id)

  useEffect(() => {
    setTradingPairsInformation()
  }, [setTradingPairsInformation])

  useEffect(() => {
    if (currentHPoolToken && account) {
      connectToCurrentHPoolTokenContract(currentHPoolToken.address)
    }
  }, [currentHPoolToken, connectToCurrentHPoolTokenContract, account])

  useEffect(() => {
    if (currentHPoolTokenContract) {
      setBuyOrders(currentHPoolToken)
      setSellOrders(currentHPoolToken)
    }
  }, [currentHPoolTokenContract, setBuyOrders, setSellOrders])

  const fetchLastTrade = (socket) => {
    socket.on('last-trade', (lastTradeData) => {
      setLastTradePriceType(lastTradeData.side)
      setLastTradePrice(lastTradeData.price)
    })
  }

  const fetchNewTrade = (socket) => {
    socket.on('new-trade', (payload) => {
      if (payload.length !== 0) {
        setNewTrade(payload)
      }
    })
  }

  const fetchMarketData = (socket) => {
    socket.on('market-data-stream', ({ volume, open, close, low, high }) => {
      const blockPriceValue = open === 0 ? 0 : ((open - close) * 100) / open
      if (+blockPriceValue.toFixed(2) !== 0) {
        setBlockPrice(blockPriceValue.toFixed(2))
      }
      if (+high.toFixed(2) !== 0) {
        setHigh(high.toFixed(2))
      }
      if (+low.toFixed(2) !== 0) {
        setLow(low.toFixed(2))
      }
      setVolume(volume)
    })
  }

  // useEffect(() => {
  //   const webSocketInstance = webSocket;
  //   fetchMarketData(webSocketInstance)
  //   fetchOrderBookBids(webSocketInstance)
  //   fetchOrderBookAsks(webSocketInstance)
  //   fetchLastTrade(webSocketInstance);
  //   fetchNewTrade(webSocketInstance);
  // }, [])

  return (
    <S.Wrapper>
      {/*{state && <Market/>}*/}
      <S.WrapperMain>
        <Navbar
          account={account}
          lastTradePrice={lastTradePrice}
          lastTradePriceType={lastTradePriceType}
          blockValues={{ volume, high, low, blockPrice }}
        />
        <S.WrapperGraph marketActive={state}>
          <Graph
            orderBookAsks={sellOrders}
            orderBookBids={buyOrders}
            latestTransaction={lastTradePrice}
            latestTransactionType={lastTradePriceType}
          />
          <MarketOrder
            setOpenOrder={(order) => setOpenOrders([order])}
            setActiveIndex={(index) => setActiveIndex(index)}
            validAccount={account}
            blockchainApi={blockchainApi}
          />
        </S.WrapperGraph>
        <Transactions
          newTradeData={newTrade}
          data={[]}
          openOrderData={openOrders}
          activeIndex={activeIndex}
          setActiveIndex={(index) => setActiveIndex(index)}
          remove={removeTransactionsOrder}
        />
      </S.WrapperMain>
      {/* <Toast /> */}
    </S.Wrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    account: state.wallet.account,
    currentHPoolTokenContract: state.contracts.currentHPoolTokenContract,
    UniswapSimplePriceOracle: state.contracts.UniswapSimplePriceOracle,
    buyOrders: state.orderbook.buyOrders,
    sellOrders: state.orderbook.sellOrders,
    currentHPoolToken: state.tradingPair.currentHPoolToken,
    openOrders: state.transactions.openOrders,
  }
}

export default connect(mapStateToProps, {
  setBuyOrders,
  setSellOrders,
  connectToCurrentHPoolTokenContract,
  setTradingPairsInformation,
  setOpenOrders,
})(Dashboard)
