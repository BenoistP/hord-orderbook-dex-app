export type ITransactionData = {
  id: string
  date: Date
  pair: string
  coin: string
  coinImage: string
  side: 'AskLimit' | 'BidLimit' | 'buy' | 'sell'
  price: number
  quantity: number
  total: number
  status: boolean
}

export type ITransactions = {
  data?: ITransactionData[]
  openOrderData: any
  activeIndex: number
  setActiveIndex: any
  newTradeData?: ITransactionData[];
  remove?: (id: string) => void
}

