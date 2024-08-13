import { useParams } from 'react-router-dom'

function UserStockDetails() {
  const { symbol } = useParams()
  console.log(symbol)
  return <div className="px-4 h-[calc(100dvh-48px)]">UserStockDetailsPage</div>
}

export default UserStockDetails
