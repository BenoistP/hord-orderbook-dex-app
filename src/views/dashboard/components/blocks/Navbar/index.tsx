import Link from '../../../../../components/general/Link';
import NavbarDropdown from '../../../../../components/general/NavbarDropdown';
import NavbarItem from '../../../../../components/general/NavbarItem';
import NavbarLanguage from '../../../../../components/general/NavbarLanguage';
import NavbarPair from '../../../../../components/general/NavbarPair';
import Dinero from 'dinero.js';
// import { IMarketToken } from 'utils/Interfaces'

import * as S from './styles';
import { connect } from 'react-redux';

type BlockProps = {
  volume: number;
  high: number;
  low: number;
  blockPrice: string;
};

export type IPairs = { name: string, image: string, address: string };

type Props = {
  blockValues: BlockProps;
  lastTradePrice: number;
  lastTradePriceType: 'AskLimit' | 'BidLimit';
  account: any;
  hPoolTokensList: IPairs[];
};
const Navbar = ({ blockValues, lastTradePrice, lastTradePriceType, account, hPoolTokensList }: Props) => {
  return (
    <S.Wrapper>
      <S.WrapperInfo>
        <S.ContainerPair>
          {hPoolTokensList && <NavbarPair coin={'BUSD'} pairs={hPoolTokensList} />}
        </S.ContainerPair>
        <S.ContainerInfo>
          <NavbarItem
            label="Last Trade Price"
            info={Dinero({ amount: Math.round(lastTradePrice * 100) }).toFormat('$0,0.00')}
            type={lastTradePriceType}
          />
          <NavbarItem label="Price 24h" info={blockValues.blockPrice.toString()} />
          <NavbarItem
            label="Volume 24h (CSTN)"
            info={Dinero({ amount: Math.round(blockValues.volume * 100) })
              .toFormat('$0')
              .toString()
              .slice(0, 6)}
          />
          <S.WrapperVolume>
            <S.VolumeHigh>
              <S.Span>24h High</S.Span>
              <p>{blockValues.high}</p>
            </S.VolumeHigh>
            <S.VolumeLow>
              <S.Span>24h Low</S.Span>
              <p>{blockValues.low}</p>
            </S.VolumeLow>
          </S.WrapperVolume>
        </S.ContainerInfo>
      </S.WrapperInfo>
      <S.WrapperLinks>
        {/*<Link title="Market" href="#" />*/}
        {/*<NavbarDropdown title="Trade" />*/}
        {/*<NavbarDropdown title="Derivatives" />*/}
        {/*<NavbarDropdown title="Finance" />*/}
        {/*<NavbarLanguage />*/}
        <S.AccountAddress>{account?.address}</S.AccountAddress>
      </S.WrapperLinks>
    </S.Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    hPoolTokensList: state.tradingPair.hPoolTokensList,
  };
};

export default connect(mapStateToProps)(Navbar);


