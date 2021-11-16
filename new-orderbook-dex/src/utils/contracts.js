import MatchingMarket from './contracts/MatchingMarket.json';
import UniswapSimplePriceOracle from './contracts/UniswapSimplePriceOracle.json';

export const contracts = [
        {
          name: 'MatchingMarket',
          address: MatchingMarket.address,
          abi: MatchingMarket.abi,
          link: `https://testnet.bscscan.com/address/${MatchingMarket.address}`,
        },
        {
          name: 'UniswapSimplePriceOracle',
          address: UniswapSimplePriceOracle.address,
          abi: UniswapSimplePriceOracle.abi,
          link: `https://testnet.bscscan.com/address/${UniswapSimplePriceOracle.address}`,
        },
];
