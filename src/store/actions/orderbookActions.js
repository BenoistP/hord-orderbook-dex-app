import { useContractReader } from 'utils/contractReader'
import { ethToWei, WeiToEth } from 'utils/web3Service'
import * as orderbookActionTypes from '../actionTypes/orderbookActionTypes'
import { setOpenOrders } from './transactionActions'
import moment from 'moment'
import { isAddressApprovedOnAsset } from 'utils/assetsService'
import callTx from 'utils/txService'

export const setBuyOrders = (HPoolToken) => async (dispatch, getState) => {
  const MatchingMarket = getState().contracts.MatchingMarket
  const BUSD = getState().contracts.BUSD
  const MakerOtcSupportMethods = getState().contracts.MakerOtcSupportMethods

  const sellTokenAddress = BUSD.address 
  const buyTokenAddress = HPoolToken.address

  const buyOffers = await useContractReader(MakerOtcSupportMethods, 'getOffers(address,address,address)', [
    MatchingMarket.address,
    sellTokenAddress,
    buyTokenAddress,
  ])
  if (!buyOffers.error) {
    const buyOrders = []
    let currentId = buyOffers.ids[0] // to check if we have a valid tradeOrder
    let currentIndex = 0

    while (currentId !== '0') {
      const buyAmt = Number(WeiToEth(buyOffers.buyAmts[currentIndex]))
      const payAmt = Number(WeiToEth(buyOffers.payAmts[currentIndex]))
      const id = buyOffers.ids[currentIndex]
      const owner = buyOffers.owners[currentIndex]

      const timestamp = buyOffers.timestamps[currentIndex]
      const date = moment.unix(timestamp).format('MMM DD YYYY hh:mm:ss')

      const buyOrder = {
        buyAmt,
        payAmt,
        id,
        owner,
        date,
        coin: HPoolToken.name,
        coinImage: HPoolToken.image,
        price: buyAmt / payAmt,
        amount: buyAmt,
        total: payAmt,
        side: 'buy',
      }
      buyOrders.push(buyOrder)

      currentIndex += 1
      currentId = buyOffers.ids[currentIndex]
    }

    dispatch({
      type: orderbookActionTypes.SET_BUY_ORDERS,
      payload: buyOrders,
    })
    dispatch(setOpenOrders(buyOrders))
  }
}

export const setSellOrders = (HPoolToken) => async (dispatch, getState) => {
  const MatchingMarket = getState().contracts.MatchingMarket
  const BUSD = getState().contracts.BUSD
  const MakerOtcSupportMethods = getState().contracts.MakerOtcSupportMethods

  const sellTokenAddress = HPoolToken.address  
  const buyTokenAddress = BUSD.address

  const sellOffers = await useContractReader(MakerOtcSupportMethods, 'getOffers(address,address,address)', [
    MatchingMarket.address,
    sellTokenAddress,
    buyTokenAddress,
  ])
  if (!sellOffers.error) {
    const sellOrders = []
    let currentId = sellOffers.ids[0] // to check if we have a valid tradeOrder
    let currentIndex = 0

    while (currentId !== '0') {
      const buyAmt = Number(WeiToEth(sellOffers.buyAmts[currentIndex]))
      const payAmt = Number(WeiToEth(sellOffers.payAmts[currentIndex]))
      const id = sellOffers.ids[currentIndex]
      const owner = sellOffers.owners[currentIndex]

      const timestamp = sellOffers.timestamps[currentIndex]
      const date = moment.unix(timestamp).format('MMM DD YYYY hh:mm:ss')

      const sellOrder = {
        buyAmt,
        payAmt,
        id,
        owner,
        date,
        coin: HPoolToken.name,
        coinImage: HPoolToken.image,
        price: buyAmt / payAmt,
        amount: payAmt,
        total: buyAmt,
        side: 'sell',
      }

      sellOrders.push(sellOrder)

      currentIndex += 1
      currentId = sellOffers.ids[currentIndex]
    }

    dispatch({
      type: orderbookActionTypes.SET_SELL_ORDERS,
      payload: sellOrders,
    })
    dispatch(setOpenOrders(sellOrders))
  }
}

export const makeBuyOrder = (busdAmount, hPoolTokenAmount) => async (dispatch, getState) => {
  // check allowance of matching market address on busd token
  const signerAddress = getState().wallet.account
  const busdContract = getState().contracts['BUSD']
  const currentHPoolTokenContract = getState().contracts['currentHPoolTokenContract']
  const matchingMarketContract = getState().contracts['MatchingMarket']
  const isTransactionAllowed = await isAddressApprovedOnAsset(signerAddress, matchingMarketContract.address, busdContract, busdAmount)
  
  // convert values to wei
  busdAmount = ethToWei(busdAmount)
  hPoolTokenAmount = ethToWei(hPoolTokenAmount)
  if (!isTransactionAllowed) {
    // if not enough allowance approve matching market address on busd contract
    await callTx(busdContract, 'approve', [matchingMarketContract.address, busdAmount], { from: signerAddress })
  }
  await callTx(matchingMarketContract, 'offer(uint256,address,uint256,address,uint256)', [busdAmount, busdContract.address, hPoolTokenAmount, currentHPoolTokenContract.address, 0], { from: signerAddress })
}

export const makeSellOrder = (busdAmount, hPoolTokenAmount) => async (dispatch, getState) => {
  // check allowance of matching market address on busd token
  const signerAddress = getState().wallet.account
  const busdContract = getState().contracts['BUSD']
  const currentHPoolTokenContract = getState().contracts['currentHPoolTokenContract']
  const matchingMarketContract = getState().contracts['MatchingMarket']
  const isTransactionAllowed = await isAddressApprovedOnAsset(signerAddress, matchingMarketContract.address, currentHPoolTokenContract, hPoolTokenAmount)
  // convert values to wei
  busdAmount = ethToWei(busdAmount)
  hPoolTokenAmount = ethToWei(hPoolTokenAmount)
  if (!isTransactionAllowed) {
    // if not enough allowance approve matching market address on busd contract
    await callTx(currentHPoolTokenContract, 'approve', [matchingMarketContract.address, hPoolTokenAmount], { from: signerAddress })
  }
  await callTx(matchingMarketContract, 'offer(uint256,address,uint256,address,uint256)', [hPoolTokenAmount, currentHPoolTokenContract.address, busdAmount, busdContract.address, 0], { from: signerAddress })
}