import { Button, Table } from 'antd'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useState } from 'react'
import store from '../../../lib/store'

function StockList() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadStocks()
  }, [])

  async function loadStocks() {
    setIsLoading(true)
    await store.getStocks()
    setIsLoading(false)
  }

  function handleStockItemClick(symbol: string) {
    store.addStockToUserPortfolio(symbol)
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
                disabled={store.userStockSymbols.includes(record.symbol)}>
                Add
              </Button>
            </div>
          )
        },
      },
    ]
  }, [store.userStockSymbols, store.miniUser])
  if (!isLoading && store.stocks === null) {
    return <div>Error loading stocks</div>
  }
  return (
    <Table loading={isLoading} dataSource={store.stocks} columns={columns} />
  )
}

const StockListObserver = observer(StockList)
export default StockListObserver
