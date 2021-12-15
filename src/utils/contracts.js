import MatchingMarket from './contracts/MatchingMarket.json';
import UniswapSimplePriceOracle from './contracts/UniswapSimplePriceOracle.json';
import ERC20 from './contracts/ERC20.json';
import MakerOtcSupportMethods from './contracts/MakerOtcSupportMethods.json';

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
  {
    name: 'MakerOtcSupportMethods',
    address: MakerOtcSupportMethods.address,
    abi: MakerOtcSupportMethods.abi,
    link: `https://testnet.bscscan.com/address/${MakerOtcSupportMethods.address}`,
  },
  {
    name: 'BUSD',
    address: '0x78867bbeef44f2326bf8ddd1941a4439382ef2a7',
    abi: ERC20.abi,
    link: `https://testnet.bscscan.com/address/0x78867bbeef44f2326bf8ddd1941a4439382ef2a7`,
  },
  // {
  //   name: 'HPoolToken',
  //   address: '0x39a8f0f941bcb56ff0f19371a366496dfc948704',
  //   abi: ERC20.abi,
  //   link: `https://testnet.bscscan.com/address/0x39a8f0f941bcb56ff0f19371a366496dfc948704`,
  // },
];
