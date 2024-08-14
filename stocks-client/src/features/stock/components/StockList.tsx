import { Button, Table } from 'antd'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useState } from 'react'
import store from '../../../lib/store'
import { useGetStocks } from '../hooks/use-get-stocks'
import { useAddStockToUserPortfolio } from '../hooks/use-add-stock-to-user-portfolio'

function StockList() {
  const [pendingStocks, setPendingStocks] = useState<string[]>([])
  const { data: stocks, isLoading: isLoadingStocks } = useGetStocks()
  const { mutateAsync: addStockToUserPortfolio, isLoading: isAddingStock } =
    useAddStockToUserPortfolio()

  useEffect(() => {
    store.getStocks(stocks)
  }, [stocks])

  function handleStockItemClick(symbol: string) {
    setPendingStocks((prev) => [...prev, symbol])
    addStockToUserPortfolio(
      { symbol },
      {
        onSuccess: (data) => {
          store.setUserStockSymbols(data.stockSymbols)
        },
        onSettled: () => {
          setPendingStocks((prev) => prev.filter((s) => s !== symbol))
        },
      },
    )
  }

  const columns = useMemo(() => {
    if (!store.miniUser) {
      return [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Symbol',
          dataIndex: 'symbol',
          key: 'symbol',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Exchange',
          dataIndex: 'exchange',
          key: 'exchange',
        },
        {
          title: 'Exchange Short Name',
          dataIndex: 'exchangeShortName',
          key: 'exchangeShortName',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
      ]
    }
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Symbol',
        dataIndex: 'symbol',
        key: 'symbol',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Exchange',
        dataIndex: 'exchange',
        key: 'exchange',
      },
      {
        title: 'Exchange Short Name',
        dataIndex: 'exchangeShortName',
        key: 'exchangeShortName',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Action',
        key: 'action',
        render: (record: StockListItem) => {
          if (store.userStockSymbols.includes(record.symbol)) {
            return <div>Added</div>
          }
          return (
            <div onClick={() => handleStockItemClick(record.symbol)}>
              <Button
                type="primary"
                loading={isAddingStock && pendingStocks.includes(record.symbol)}
                disabled={store.userStockSymbols.includes(record.symbol)}>
                Add
              </Button>
            </div>
          )
        },
      },
    ]
  }, [store.userStockSymbols, store.miniUser])
  if (!isLoadingStocks && !stocks) {
    return <div>Error loading stocks</div>
  }
  return (
    <Table
      loading={isLoadingStocks}
      dataSource={store.stocks}
      columns={columns}
    />
  )
}

const StockListObserver = observer(StockList)
export default StockListObserver
