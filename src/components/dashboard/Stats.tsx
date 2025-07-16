import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useDashboardContext } from "@/store/dashboard-state";

const Stats = () => {
    const {totalLinksCreated, totalClicks} = useDashboardContext()
  return (
    <div className="grid sm:grid-cols-2 gap-4 mb-16">
        <Card>
          <CardHeader>
            <CardDescription>Total Links Created</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalLinksCreated}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Clicks</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalClicks}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
  )
}

export default Stats
