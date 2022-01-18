import React, { useState } from 'react'
import Checkbox from '../../../../../components/general/Checkbox'
import TransactionTable from '../../../../../components/general/TransactionTable'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import { ITransactions } from './ITransactions'
import * as S from './styles'
import OpenOrderTable from '../../../../../components/general/OpenOrderTable'
import Toast from '../../../../../components/general/Toast'

const initialFilters = {
  hiddenPairs: false,
  onlyBuy: false,
  onlySell: false,
  status: 'All Transactions',
}

const Transactions = (
  { data, openOrderData, newTradeData, remove, activeIndex, setActiveIndex }: ITransactions,
  pair = 'DOT',
) => {
  const [filters, setFilters] = useState(initialFilters)

  // Filters Actions
  const handleChangeHidden = () => setFilters({ ...filters, hiddenPairs: !filters.hiddenPairs })
  const handleChangeBuy = () => setFilters({ ...filters, onlyBuy: !filters.onlyBuy })
  const handleChangeSell = () => setFilters({ ...filters, onlySell: !filters.onlySell! })

  return (
    <S.Section>
      <Tabs selectedIndex={activeIndex} onSelect={(index) => setActiveIndex(index)}>
        <S.Header>
          <TabList style={{display: "flex", listStyleType: "none"}}>
            <Tab>My Open Orders</Tab>
            <Tab>My Trade History</Tab>
          </TabList>
          <S.WrapperActions>
            <Checkbox title="Hide Other Pairs" checked={filters.hiddenPairs} action={handleChangeHidden} />
            <S.ContainerActions>
              <Checkbox title="Buy" checked={filters.onlyBuy} action={handleChangeBuy} />
              <Checkbox title="Sell" checked={filters.onlySell} action={handleChangeSell} />
            </S.ContainerActions>
          </S.WrapperActions>
        </S.Header>
        <TabPanel>
          <OpenOrderTable data={openOrderData} remove={remove} filters={filters} />
        </TabPanel>
        <TabPanel>
          <TransactionTable data={data} remove={remove} filters={filters} />
        </TabPanel>
      </Tabs>
      <Toast />
    </S.Section>
  )
}

export default Transactions
