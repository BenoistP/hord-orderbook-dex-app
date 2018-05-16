/* global test expect */
import charts from './charts';
import { Map, List } from 'immutable';
import moment from 'moment';
import { mockDate } from '../../utils/testHelpers';
import BigNumber from 'bignumber.js';

const wei = x => new BigNumber(1000000000000000000).mul(x).toString()

const state = Map({
  trades: Map({
    marketHistory: List([
      {
        timestamp: moment('2018-05-16 10:14').unix(),
        buyWhichToken: 'W-ETH',
        sellWhichToken: 'MKR',
        buyHowMuch: wei(200),
        sellHowMuch: wei(100),
      },
      {
        timestamp: moment('2018-05-16 09:14').unix(),
        buyWhichToken: 'W-ETH',
        sellWhichToken: 'SAI',
        buyHowMuch: wei(100),
        sellHowMuch: wei(100),
      },
      {
        timestamp: moment('2018-05-16 09:14').unix(),
        buyWhichToken: 'DAI',
        sellWhichToken: 'MKT',
        buyHowMuch: wei(100),
        sellHowMuch: wei(100),
      },
      {
        timestamp: moment('2018-05-16 08:14').unix(),
        buyWhichToken: 'MKR',
        sellWhichToken: 'W-ETH',
        buyHowMuch: wei(800),
        sellHowMuch: wei(1000),
      },
      {
        timestamp: moment('2018-05-11 08:14').unix(),
        buyWhichToken: 'W-ETH',
        sellWhichToken: 'MKR',
        buyHowMuch: wei(500),
        sellHowMuch: wei(200),
      },
      {
        timestamp: moment('2018-05-10 08:14').unix(),
        buyWhichToken: 'MKR',
        sellWhichToken: 'W-ETH',
        buyHowMuch: wei(200),
        sellHowMuch: wei(500),
      },
      {
        timestamp: moment('2018-05-09 08:14').unix(),
        buyWhichToken: 'MKR',
        sellWhichToken: 'W-ETH',
        buyHowMuch: wei(200),
        sellHowMuch: wei(500),
      },
    ]),
  }),
  offers: Map({
    offers: Map()
      .set(Map({baseToken: 'MKR', quoteToken: 'W-ETH'}), Map({
        buyOffers: List([
          {
            buyHowMuch: wei(900),
            sellHowMuch: wei(1100),
            bid_price: '1.25',
            bid_price_sort: 1.25,
          },
          {
            buyHowMuch: wei(1000),
            sellHowMuch: wei(1200),
            bid_price: '1.27',
            bid_price_sort: 1.27,
          },
        ]),
        sellOffers: List([
          {
            buyHowMuch: wei(250),
            sellHowMuch: wei(200),
            ask_price: '1.28',
            ask_price_sort: 1.28,
          },
          {
            buyHowMuch: wei(300),
            sellHowMuch: wei(250),
            ask_price: '1.26',
            ask_price_sort: 1.26,
          },
        ]),
      })),
  }),
});

const props = {tradingPair: {baseToken: 'MKR', quoteToken: 'W-ETH'}};

const refDate = '2018-05-16';


test('priceChartLabels', () => {
  expect(mockDate(refDate, () => charts.priceChartLabels(state, props))).toMatchSnapshot();
});

test('priceChartValues', () => {
  expect(mockDate(refDate, () => charts.priceChartValues(state, props))).toMatchSnapshot();
});


test('volumeChartLabels', () => {
  expect(mockDate(refDate, () => charts.volumeChartLabels(state, props))).toMatchSnapshot();
});

test('volumeChartValues', () => {
  expect(mockDate(refDate, () => charts.volumeChartValues(state, props))).toMatchSnapshot();
});

test('volumeChartTooltips', () => {
  expect(mockDate(refDate, () => charts.volumeChartTooltips(state, props))).toMatchSnapshot();
});


test('depthChartLabels', () => {
  expect(mockDate(refDate, () => charts.depthChartLabels(state, props))).toMatchSnapshot();
});

test('depthChartValues', () => {
  expect(mockDate(refDate, () => charts.depthChartValues(state, props))).toMatchSnapshot();
});

test('depthChartTooltips', () => {
  expect(mockDate(refDate, () => charts.depthChartTooltips(state, props))).toMatchSnapshot();
});
