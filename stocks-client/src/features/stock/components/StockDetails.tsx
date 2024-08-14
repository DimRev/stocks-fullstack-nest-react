import { observer } from 'mobx-react'
import { useGetStocksBySymbol } from '../hooks/use-get-stocks-by-symbol'
import { Card, Col, Row, Typography } from 'antd'
import Title from 'antd/es/typography/Title'

type Props = {
  symbol: string
}

function StockDetails({ symbol }: Props) {
  const { data: stockDetails, isLoading: isLoadingStockDetails } =
    useGetStocksBySymbol({ symbol })

  if (isLoadingStockDetails) return <div>Loading...</div>
  if (!stockDetails) return <div>No stock details found</div>
  return (
    <Card>
      <Title level={2}>
        {stockDetails.name} ({stockDetails.symbol})
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Text strong>Price:</Typography.Text> $
          {stockDetails.price.toFixed(2)}
        </Col>
        <Col span={12}>
          <Typography.Text strong>Day Low:</Typography.Text> $
          {stockDetails.dayLow.toFixed(2)}
        </Col>
        <Col span={12}>
          <Typography.Text strong>Day High:</Typography.Text> $
          {stockDetails.dayHigh.toFixed(2)}
        </Col>
        <Col span={12}>
          <Typography.Text strong>Year Low:</Typography.Text> $
          {stockDetails.yearLow.toFixed(2)}
        </Col>
        <Col span={12}>
          <Typography.Text strong>Year High:</Typography.Text> $
          {stockDetails.yearHigh.toFixed(2)}
        </Col>
        <Col span={12}>
          <Typography.Text strong>Market Cap:</Typography.Text> $
          {stockDetails.marketCap.toLocaleString()}
        </Col>
        <Col span={12}>
          <Typography.Text strong>PE Ratio:</Typography.Text>{' '}
          {stockDetails.peRatio}
        </Col>
        <Col span={12}>
          <Typography.Text strong>Exchange:</Typography.Text>{' '}
          {stockDetails.exchange}
        </Col>
        <Col span={12}>
          <Typography.Text strong>Volume:</Typography.Text>{' '}
          {stockDetails.volume.toLocaleString()}
        </Col>
        <Col span={12}>
          <Typography.Text strong>Average Volume:</Typography.Text>{' '}
          {stockDetails.avgVolume.toLocaleString()}
        </Col>
        <Col span={12}>
          <Typography.Text strong>Open:</Typography.Text> $
          {stockDetails.open.toFixed(2)}
        </Col>
        <Col span={12}>
          <Typography.Text strong>Previous Close:</Typography.Text> $
          {stockDetails.previousClose.toFixed(2)}
        </Col>
        <Col span={12}>
          <Typography.Text strong>EPS:</Typography.Text> $
          {stockDetails.eps.toFixed(2)}
        </Col>
        <Col span={12}>
          <Typography.Text strong>Earnings Announcement:</Typography.Text>{' '}
          {new Date(stockDetails.earningsAnnouncement).toLocaleDateString()}
        </Col>
        <Col span={12}>
          <Typography.Text strong>Shares Outstanding:</Typography.Text>{' '}
          {stockDetails.sharesOutstanding.toLocaleString()}
        </Col>
      </Row>
    </Card>
  )
}

const StockDetailsObserver = observer(StockDetails)
export default StockDetailsObserver
