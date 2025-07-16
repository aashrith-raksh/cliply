import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const Stats = () => {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mb-16">
        <Card>
          <CardHeader>
            <CardDescription>Total Links Created</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $1,250.00
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Clicks</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $1,250.00
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
  )
}

export default Stats
