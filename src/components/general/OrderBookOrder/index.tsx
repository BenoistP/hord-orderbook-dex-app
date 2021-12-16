import { connect } from 'react-redux';
import { handleInputChange } from 'store/actions/inputActions';
import { IOrderBookData } from '../../../views/dashboard/components/blocks/Graph/IGraph';

import * as S from './styles';

export type Props = {
  data: IOrderBookData;
  exchangeImg: string;
  handleInputChange: (inputName: string, value: number) => void;
};
const OrderBookOrder = ({ data, exchangeImg, handleInputChange }: Props) => {
  return <S.Tr onClick={() => {
    handleInputChange('amount', data.amount)
    handleInputChange('price', data.total)
  }} >
    <S.Td>{data.price}</S.Td>
    <S.Td>
      <S.ContainerFlex>
        <S.Span data={data}>
          {data.amount} {data.coin}
        </S.Span>
        <S.Image src={exchangeImg} />
        <span>{data.total} BUSD</span>
      </S.ContainerFlex>
    </S.Td>
  </S.Tr>
};

export default connect(null, {
  handleInputChange
})(OrderBookOrder);
