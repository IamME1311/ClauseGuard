import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/components/dashboard-layout"

export default function Loading() {
  return (
    <DashboardLayout>
      <div className="container py-6">
        <Skeleton className="h-8 w-48 mb-6" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[200px] rounded-lg" />
          <Skeleton className="h-[200px] rounded-lg" />
          <Skeleton className="h-[200px] rounded-lg" />
        </div>

        <Skeleton className="h-8 w-36 mt-10 mb-4" />

        <div className="space-y-4">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="h-[120px] rounded-lg" />
            ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
