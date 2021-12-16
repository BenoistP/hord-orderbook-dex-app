import * as S from './styles'
import Icon from '../Icon'
import { connect } from 'react-redux'

type OpenOrderProps = {
  price: string
  amount: string
  tradeAmount: number
  status: string
  fee: number
  side: 'sell' | 'buy'
  date: Date
  coin: 'string'
  coinImage: 'image'
}

type Props = {
  data?: OpenOrderProps[]
  remove?: (id: string) => void
  filters?: {
    hiddenPairs: boolean
    onlyBuy: boolean
    onlySell: boolean
    status: string
  }
  currentHPoolTokenName: string
  currentHPoolTokenImage: string
}

const OpenOrderTable = ({ data, currentHPoolTokenName, currentHPoolTokenImage }: Props) => (
  <>
    {data && (
      <S.Wrapper>
        <S.Table>
          <S.Thead>
            <S.Tr>
              <S.Th>Date</S.Th>
              <S.Th>Pair</S.Th>
              <S.Th>Side</S.Th>
              <S.Th>Price</S.Th>
              <S.Th>Amount</S.Th>
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            {data.map((order, index) => (
              <S.Tr key={index}>
                <S.Td>
                  <S.Tag>Date</S.Tag>
                  <S.Status>{order.date}</S.Status>
                </S.Td>

                <S.Td>
                  <S.Tag>Pair</S.Tag>
                  <S.ContainerFlex>
                    <span>{`${order.coin}/ BUSD`}</span>
                  </S.ContainerFlex>
                </S.Td>

                <S.Td>
                  <S.Tag>Side</S.Tag>
                  <S.ContainerFlex>
                    <S.Image src={`img/icons/${order.side === 'sell' ? 'Sell' : 'Buy'}.svg`} />
                    <span>{order.side === 'sell' ? 'Sell' : 'Buy'}</span>
                  </S.ContainerFlex>
                </S.Td>

                <S.Td>
                  <S.Tag>Price</S.Tag>
                  <span>{order.price}</span>
                </S.Td>

                <S.Td>
                  <S.Tag>Amount</S.Tag>
                  <span>{order.amount}</span>
                </S.Td>
              </S.Tr>
            ))}
          </S.Tbody>
        </S.Table>
      </S.Wrapper>
    )}
  </>
)

const mapStateToProps = (state) => {
  return {
    currentHPoolTokenName: state.tradingPair.currentHPoolToken?.name,
    currentHPoolTokenImage: state.tradingPair.currentHPoolToken?.image,
  }
}

export default connect(mapStateToProps)(OpenOrderTable)
