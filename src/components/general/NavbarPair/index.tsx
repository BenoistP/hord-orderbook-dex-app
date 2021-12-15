import { useState } from 'react';
import { connect } from 'react-redux';
import { changeCurrentHPoolToken } from 'store/actions/tradingPairActions';
import { IPairs } from 'views/dashboard/components/blocks/Navbar';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';
import Icon from '../Icon';
import * as S from './styles';

export type NavbarPairProps = {
  coin?: string;
  pairs?: IPairs[];
  currentHPoolTokenName: string;
  changeCurrentHPoolToken: (hPoolTokenName: string) => void
};

const NavbarPair = ({ coin, pairs, currentHPoolTokenName, changeCurrentHPoolToken }: NavbarPairProps) => {
  const [state, setState] = useState(currentHPoolTokenName);
  const [dropdownState, setDropdownState] = useState(false);

  const handleChange = (select: string) => {
    setDropdownState(false);
    setState(select);
    changeCurrentHPoolToken(select)
  };

  return (
    <S.Wrapper>
      <S.WrapperCoin>
        <S.Label>Coin</S.Label>
        <S.Container>
          <S.Image src={`img/cryptocurrencies/${coin}.png`} />
          <S.Name>{coin}</S.Name>
        </S.Container>
      </S.WrapperCoin>
      <S.WrapperExchange>
        <Icon source="Exchange" />
      </S.WrapperExchange>
      <S.WrapperCoin>
        <S.Label>Pair</S.Label>

        <Dropdown title={state} active={dropdownState} setDropdownState={setDropdownState}>
          <>
            {pairs.map(({ name }) => (
              <DropdownItem key={name} title={name} handleAction={handleChange} />
            ))}
          </>
        </Dropdown>
      </S.WrapperCoin>
    </S.Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    currentHPoolTokenName: state.tradingPair.currentHPoolToken?.name,
  };
};

export default connect(mapStateToProps, {
  changeCurrentHPoolToken
})(NavbarPair);
