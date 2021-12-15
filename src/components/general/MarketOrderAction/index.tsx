import React, { useEffect, useState } from 'react';
import BN from 'bn.js';
import { toast } from 'react-toastify';
import { handleInputChange } from 'store/actions/inputActions';
import Button from '../Button';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import Input from '../Input';
import Link from '../Link';
import Range from '../Range';
import * as S from './styles';
import { connect } from 'react-redux';

export type MarketOrderActionProps = {
  type?: 'Sell' | 'Buy';
  setOpenOrder: any;
  price: number;
  amount: number;
  account: any;
  blockchainApi: any;
  orderType: string;
  setActiveIndex: any;
  handleInputChange: (inputName: string, inputValue: number) => void
};
const MarketOrderAction = ({
  type = 'Buy',
  setOpenOrder,
  price,
  amount,
  handleInputChange,
  account,
  blockchainApi,
  orderType,
  setActiveIndex,
}: MarketOrderActionProps) => {
  const [slider, setSlider] = useState({ values: [50] });
  const [available, setAvailable] = useState(0);
  const [dropdownState, setDropdownState] = useState(false);

  const tradingPairID = '0xf28a3c76161b8d5723b6b8b092695f418037c747faa2ad8bc33d8871f720aac9';
  const UNIT = 1000000000000;

  const cleanString = (value) => {
    let pos = value.indexOf('.');
    if (pos === -1) {
      return value;
    } else {
      return value.substring(0, pos);
    }
  };

  const getCurrentStatus = () => {
    if (orderType === 'Limit Order') {
      if (type === 'Buy') {
        return 'BidLimit';
      } else {
        return 'AskLimit';
      }
    } else if (orderType === 'Market Order') {
      if (type === 'Buy') {
        return 'BidMarket';
      } else {
        return 'AskMarket';
      }
    }
  };

  const startTransaction = async () => {
    // if (account.address) {
    //   const polkadotExtensionDapp = await import('@polkadot/extension-dapp');
    //   const injector = await polkadotExtensionDapp.web3FromSource(account.meta.source);
    //   toast.success(type + ' initiated');
    //   let transferExtrinsic;
    //   if (getCurrentStatus() === "BidMarket") {
    //     transferExtrinsic = blockchainApi.tx.polkadex.submitOrder(
    //       getCurrentStatus(),
    //       tradingPairID,
    //       new BN(cleanString((parseFloat(amount + '') * UNIT).toString()), 10),
    //       new BN(cleanString((parseFloat(price + '') * UNIT).toString()), 10)
    //     );
    //   } else {
    //     transferExtrinsic = blockchainApi.tx.polkadex.submitOrder(
    //       getCurrentStatus(),
    //       tradingPairID,
    //       new BN(cleanString((parseFloat(price + '') * UNIT).toString()), 10),
    //       new BN(cleanString((parseFloat(amount + '') * UNIT).toString()), 10)
    //     );
    //   }
    //   setActiveIndex(0);
    //   transferExtrinsic.signAndSend(account.address, { signer: injector.signer }, ({ status }) => {
    //     if (orderType === 'Limit Order') {
    //       setOpenOrder({
    //         price,
    //         amount,
    //         tradeAmount: price * amount,
    //         status: status.type,
    //         fee: (0.2 * price * amount),
    //         side: getCurrentStatus()
    //       });
    //     } else if (orderType === 'Market Order') {
    //       setOpenOrder({
    //         price: 'Market',
    //         amount,
    //         tradeAmount: '-',
    //         status: status.type,
    //         fee: '-',
    //         side: getCurrentStatus()
    //       });
    //     }
    //     setPrice('0');
    //     orderType === 'Limit Order' && type === 'Buy' && setAmount('0');
    //     toast.success(`Transaction status: ${status.type}`);
    //   }).catch((error: any) => {
    //     toast.success('Transaction failed: ' + error);
    //   });
    // }
  };

  const validatePrice = (inputPrice) => {
    if (!isNaN(inputPrice)) {
      handleInputChange('price', inputPrice);
    }
  };

  const validateAmount = (inputAmount) => {
    let sliderValue = getSliderValue(inputAmount);
    if (!isNaN(inputAmount) && inputAmount >= 0 && sliderValue >= 0 && sliderValue <= 100) {
      handleInputChange('amount', inputAmount);
      setSlider({ values: [+sliderValue.toFixed(2)] });
    }
  };

  const getSliderValue = (inputAmount) => {
    if (price === 0 && orderType === 'Limit Order' && type === 'Buy') {
      return 0;
    } else if (price > 0 && orderType === 'Limit Order' && type === 'Buy') {
      return (inputAmount * price * 100) / available;
    } else {
      return (inputAmount * 100) / available;
    }
  };

  const setSliderValue = (sliderValue: { values: number[] }) => {
    const inputAmount = Number(getAmountValue(available, price, sliderValue).toFixed(4));
    handleInputChange('amount', inputAmount);
    setSlider(sliderValue);
  };

  const getAmountValue = (availableBalance, updatedPrice, sliderValue = slider) => {
    let newAmount = 0;
    if (+updatedPrice === 0 && orderType === 'Limit Order' && type === 'Buy') {
      newAmount = 0;
    } else if (updatedPrice > 0 && orderType === 'Limit Order' && type === 'Buy') {
      newAmount = (availableBalance * +sliderValue.values[0].toFixed(2)) / (updatedPrice * 100);
    } else {
      newAmount = (availableBalance * +sliderValue.values[0].toFixed(2)) / 100;
    }
    return newAmount;
  };

  return (
    <S.WrapperOrder>
      <S.ContainerWallet>
        <Icon source="Wallet" background="DarkGray" size="Medium" />
        <S.WrapperBalance>
          <span>Available</span>
          <S.Span>
            {available} {type === 'Buy' ? 'BUSD' : 'BTC'}
          </S.Span>
        </S.WrapperBalance>
      </S.ContainerWallet>
      <S.ContainerForm>
        <form onSubmit={() => console.log('Submiting..')}>
          {orderType === 'Limit Order' ? (
            <Input
              label="Price"
              icon="ArrowVerticalTop"
              placeholder="0.0000000"
              value={price}
              type="text"
              inputInfo="BUSD"
              fullWidth={true}
              setValue={(inputPrice) => validatePrice(inputPrice)}
            />
          ) : (
            <Input
              label="Price"
              icon="ArrowVerticalTop"
              placeholder="0.0000000"
              value={'Market'}
              type="text"
              inputInfo="BUSD"
              fullWidth={true}
            />
          )}
          <Input
            label="Amount"
            icon="ArrowVerticalBottom"
            placeholder="0.0000000"
            value={amount}
            type="text"
            inputInfo={orderType === 'Market Order' && type === 'Buy' ? 'BUSD' : 'BTC'}
            fullWidth={true}
            setValue={(inputAmount) => validateAmount(inputAmount)}
          />
          <S.WrapperActions>
            <p>
              Equivalent ~<span> $0</span>
            </p>
            <Dropdown title="Fee 0 PDX" active={dropdownState} setDropdownState={setDropdownState}>
              <Link title="Custom Fee" />
            </Dropdown>
          </S.WrapperActions>
          <Range values={slider.values} setValues={(value) => setSliderValue(value)} />
          <Button type="button" title={type} fullWidth={true} click={startTransaction} disabled={!account?.address} />
        </form>
      </S.ContainerForm>
    </S.WrapperOrder>
  );
};

const mapStateToProps = (state) => {
  return {
    price: state.input.price,
    amount: state.input.amount,
  };
};

export default connect(mapStateToProps, {
 handleInputChange
})(MarketOrderAction);

