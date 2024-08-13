import { useNavigate, useParams } from 'react-router-dom'
import StockDetailsObserver from '../stock/components/StockDetails'

function UserStockDetails() {
  const { symbol } = useParams()

  const navigate = useNavigate()

  if (!symbol) {
    navigate('/portfolio')
    return null
  }

  return (
    <div className="px-4 h-[calc(100dvh-48px)]">
      <StockDetailsObserver symbol={symbol} />
    </div>
  )
}

export default UserStockDetails
