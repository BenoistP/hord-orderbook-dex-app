import { useContractReader } from 'utils/contractReader';
import { WeiToEth } from 'utils/web3Service';
import * as orderbookActionTypes from '../actionTypes/orderbookActionTypes';

export const setBuyOrders = (HPoolToken) => async (dispatch, getState) => {
  const MatchingMarket = getState().contracts.MatchingMarket;
  const BUSD = getState().contracts.BUSD;
  const MakerOtcSupportMethods = getState().contracts.MakerOtcSupportMethods;

  const sellTokenAddress = HPoolToken.address;
  const buyTokenAddress = BUSD.address;

  const buyOffers = await useContractReader(MakerOtcSupportMethods, 'getOffers(address,address,address)', [
    MatchingMarket.address,
    sellTokenAddress,
    buyTokenAddress,
  ]);
  if (!buyOffers.error) {
    const buyOrders = [];
    let currentId = buyOffers.ids[0]; // to check if we have a valid tradeOrder
    let currentIndex = 0;

    while (currentId !== '0') {
      const buyAmt = Number(WeiToEth(buyOffers.buyAmts[currentIndex]));
      const payAmt = Number(WeiToEth(buyOffers.payAmts[currentIndex]));
      const id = buyOffers.ids[currentIndex];
      const owner = buyOffers.owners[currentIndex];

      const buyOrder = {
        buyAmt,
        payAmt,
        id,
        owner,
        date: new Date(),
        pair: 'DOT',
        coin: 'BTC',
        price: payAmt,
        amount: buyAmt,
        total: buyAmt * payAmt,
      };

      buyOrders.push(buyOrder);

      currentIndex += 1;
      currentId = buyOffers.ids[currentIndex];
    }
    console.log(buyOrders);

    dispatch({
      type: orderbookActionTypes.SET_BUY_ORDERS,
      payload: buyOrders,
    });
  }
};

export const setSellOrders = (HPoolToken) => async (dispatch, getState) => {
  const MatchingMarket = getState().contracts.MatchingMarket;
  const BUSD = getState().contracts.BUSD;
  const MakerOtcSupportMethods = getState().contracts.MakerOtcSupportMethods;

  const sellTokenAddress = BUSD.address;
  const buyTokenAddress = HPoolToken.address;

  const sellOffers = await useContractReader(MakerOtcSupportMethods, 'getOffers(address,address,address)', [
    MatchingMarket.address,
    sellTokenAddress,
    buyTokenAddress,
  ]);
  if (!sellOffers.error) {
    const sellOrders = [];
    let currentId = sellOffers.ids[0]; // to check if we have a valid tradeOrder
    let currentIndex = 0;

    while (currentId !== '0') {
      const buyAmt = Number(WeiToEth(sellOffers.buyAmts[currentIndex]));
      const payAmt = Number(WeiToEth(sellOffers.payAmts[currentIndex]));
      const id = sellOffers.ids[currentIndex];
      const owner = sellOffers.owners[currentIndex];

      // initially:
      //  buyAmt,
      //   payAmt,
      //   id,
      //   owner,
      const sellOrder = {
        buyAmt,
        payAmt,
        id,
        owner,
        date: new Date(),
        pair: 'DOT',
        coin: 'BTC',
        price: payAmt,
        amount: buyAmt,
        total: buyAmt * payAmt,
      };

      sellOrders.push(sellOrder);

      currentIndex += 1;
      currentId = sellOffers.ids[currentIndex];
    }
    console.log('SELL', sellOrders);

    dispatch({
      type: orderbookActionTypes.SET_SELL_ORDERS,
      payload: sellOrders,
    });
  }
};

export const makeBuyOrder = (HPoolToken) => async (dispatch, getState) => {
  const MatchingMarket = getState().contracts.MatchingMarket;
  const BUSD = getState().contracts.BUSD;
  const MakerOtcSupportMethods = getState().contracts.MakerOtcSupportMethods;

  const sellTokenAddress = HPoolToken.address;
  const buyTokenAddress = BUSD.address;

  const buyOffers = await useContractReader(MakerOtcSupportMethods, 'getOffers(address,address,address)', [
    MatchingMarket.address,
    sellTokenAddress,
    buyTokenAddress,
  ]);
  if (!buyOffers.error) {
    const buyOrders = [];
    let currentId = buyOffers.ids[0]; // to check if we have a valid tradeOrder
    let currentIndex = 0;

    while (currentId !== '0') {
      const buyAmt = Number(WeiToEth(buyOffers.buyAmts[currentIndex]));
      const payAmt = Number(WeiToEth(buyOffers.payAmts[currentIndex]));
      const id = buyOffers.ids[currentIndex];
      const owner = buyOffers.owners[currentIndex];

      const buyOrder = {
        buyAmt,
        payAmt,
        id,
        owner,
        date: new Date(),
        pair: 'DOT',
        coin: 'BTC',
        price: payAmt,
        amount: buyAmt,
        total: buyAmt * payAmt,
      };

      buyOrders.push(buyOrder);

      currentIndex += 1;
      currentId = buyOffers.ids[currentIndex];
    }
    console.log(buyOrders);

    dispatch({
      type: orderbookActionTypes.SET_BUY_ORDERS,
      payload: buyOrders,
    });
  }
};

export const makeSellOrder = (HPoolToken) => async (dispatch, getState) => {
  const MatchingMarket = getState().contracts.MatchingMarket;
  const BUSD = getState().contracts.BUSD;
  const MakerOtcSupportMethods = getState().contracts.MakerOtcSupportMethods;

  const sellTokenAddress = BUSD.address;
  const buyTokenAddress = HPoolToken.address;

  const sellOffers = await useContractReader(MakerOtcSupportMethods, 'getOffers(address,address,address)', [
    MatchingMarket.address,
    sellTokenAddress,
    buyTokenAddress,
  ]);
  if (!sellOffers.error) {
    const sellOrders = [];
    let currentId = sellOffers.ids[0]; // to check if we have a valid tradeOrder
    let currentIndex = 0;

    while (currentId !== '0') {
      const buyAmt = Number(WeiToEth(sellOffers.buyAmts[currentIndex]));
      const payAmt = Number(WeiToEth(sellOffers.payAmts[currentIndex]));
      const id = sellOffers.ids[currentIndex];
      const owner = sellOffers.owners[currentIndex];

      // initially:
      //  buyAmt,
      //   payAmt,
      //   id,
      //   owner,
      const sellOrder = {
        buyAmt,
        payAmt,
        id,
        owner,
        date: new Date(),
        pair: 'DOT',
        coin: 'BTC',
        price: payAmt,
        amount: buyAmt,
        total: buyAmt * payAmt,
      };

      sellOrders.push(sellOrder);

      currentIndex += 1;
      currentId = sellOffers.ids[currentIndex];
    }
    console.log('SELL', sellOrders);

    dispatch({
      type: orderbookActionTypes.SET_SELL_ORDERS,
      payload: sellOrders,
    });
  }
};

// const contracts = await loadContracts();
// debugger;
// const { signer, provider, signerAddress } = await connectWallet();
// debugger;
// const contract = loadContracts(signer);
// debugger;
// const MatchingMarket = contract['MatchingMarket']
// const BUSD = contract['BUSD']
// const HPoolToken = contract['HPoolToken']
// const MakerOtcSupportMethods = contract['MakerOtcSupportMethods']
// debugger
// const hundredTokensInWei = utils.parseEther('1000000000')
// const tenTokensInWei = utils.parseEther('20347')
// const oneTokenInWei = utils.parseEther('2')
// const testTokensInWei = utils.parseEther('3')
// const test2TokenInWei = utils.parseEther('15213')
// const test3TokensInWei = utils.parseEther('2')
// const test4TokenInWei = utils.parseEther('11334')

/* FIRST STEP APPROVE TOKEN */
// approve HPoolToken - first check if enough is already approved
// approve HPool Token
// await txHandler(HPoolToken, 'approve', [MatchingMarket.address, hundredTokensInWei])
// approve BUSD
// await txHandler(BUSD, 'approve', [MatchingMarket.address, hundredTokensInWei])

/* SECOND STEP OFFER TOKEN */
// market maker tx
// offer(pay_amt, pay_gem, buy_amt, buy_gem, pos) 99% every time like this - there are 3 different one
// uint pay_amt,    //maker (ask) sell how much
// ERC20 pay_gem,   //maker (ask) sell which token
// uint buy_amt,    //maker (ask) buy how much
// ERC20 buy_gem,   //maker (ask) buy which token
// uint pos,        //position to insert offer, 0 should be used if unknown
// offer HPool token for BUSD
// single
// await txHandler(MatchingMarket, 'offer(uint256,address,uint256,address,uint256)', [tenTokensInWei, HPoolToken.address, oneTokenInWei, BUSD.address, 0])
// multi
// await Promise.all([txHandler(MatchingMarket, 'offer(uint256,address,uint256,address,uint256)', [tenTokensInWei, HPoolToken.address, oneTokenInWei, BUSD.address, 0])
// ,txHandler(MatchingMarket, 'offer(uint256,address,uint256,address,uint256)', [testTokensInWei, HPoolToken.address, test2TokenInWei, BUSD.address, 0])
// ,txHandler(MatchingMarket, 'offer(uint256,address,uint256,address,uint256)', [test3TokensInWei, HPoolToken.address, test4TokenInWei, BUSD.address, 0])])
// offer BUSD for HPool token
// single
// await txHandler(MatchingMarket, 'offer(uint256,address,uint256,address,uint256)', [oneTokenInWei, BUSD.address, tenTokensInWei, HPoolToken.address, 0])
// multi
//  await Promise.all([txHandler(MatchingMarket, 'offer(uint256,address,uint256,address,uint256)', [oneTokenInWei, BUSD.address, tenTokensInWei, HPoolToken.address, 0])
// ,txHandler(MatchingMarket, 'offer(uint256,address,uint256,address,uint256)', [testTokensInWei, BUSD.address, test2TokenInWei, HPoolToken.address, 0])
// ,txHandler(MatchingMarket, 'offer(uint256,address,uint256,address,uint256)', [test3TokensInWei, BUSD.address, test4TokenInWei, HPoolToken.address, 0])])

/* THIRD STEP GET BEST OFFER FROM PAIR */
// market maker tx
// getBestOffer(ERC20 sell_gem, ERC20 buy_gem)
// eslint-disable-next-line
// const bestOfferId = await useContractReader({ MatchingMarket }, 'MatchingMarket', 'getBestOffer', [HPoolToken.address, BUSD.address]);
// eslint-disable-next-line
// const bestOfferData = await useContractReader({ MatchingMarket }, 'MatchingMarket', 'getOffer', [bestOfferId]);
// example output:  "100000000000000000000,0x39A8f0f941BCb56ff0f19371a366496dfC948704,1000000000000000000,0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"
// const splittedBestOfferData = bestOfferData.split(',');
// values need to get converted to human readable number with utils.formatEther(value)

/* GET BUY OFFERS FOR PAIR */
// firstPage = (sellToken, buyToken) => getOTCSupportMethodsContractInstance().getOffers(
//   getMarketContractInstance().address,
//   getTokenContractInstance(sellToken).address,
//   getTokenContractInstance(buyToken).address
// ),
// const sellTokenAddress = HPoolToken.address;
// const buyTokenAddress = BUSD.address;
// // eslint-disable-next-line
// const buyOffers = await useContractReader({ MakerOtcSupportMethods }, 'MakerOtcSupportMethods', 'getOffers(address,address,address)', [MatchingMarket.address, sellTokenAddress, buyTokenAddress ]);
// console.log(buyOffers)
// debugger

// /* GET SELL OFFERS FOR PAIR */
// // firstPage = (sellToken, buyToken) => getOTCSupportMethodsContractInstance().getOffers(
// //   getMarketContractInstance().address,
// //   getTokenContractInstance(sellToken).address,
// //   getTokenContractInstance(buyToken).address
// // ),
// const sellTokenAddress = HPoolToken.address;
// const buyTokenAddress = BUSD.address;
// // eslint-disable-next-line
// const buyOffers = await useContractReader({ MakerOtcSupportMethods }, 'MakerOtcSupportMethods', 'getOffers(address,address,address)', [MatchingMarket.address, sellTokenAddress, buyTokenAddress ]);
// console.log(buyOffers)
// debugger
