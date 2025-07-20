import { MonthlyCityClicksChart } from '../link-charts/MonthlyCityClicksChart'
import { TotalDeviceClicksChart } from '../link-charts/TotalDeviceClicks'

const LinkStats = () => {
  return (
    <section className='grow space-y-6'>
      <MonthlyCityClicksChart/>
      <TotalDeviceClicksChart/>
    </section>
  )
}

export default LinkStats
