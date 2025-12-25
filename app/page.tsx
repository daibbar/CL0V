import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Activity, BookOpen, TrendingUp, TrendingDown } from "lucide-react"
import { getClubs } from "@/actions/club-actions"
import { getEvents } from "@/actions/event-actions"
import { getStudents } from "@/actions/student-actions"
import { getActivities } from "@/actions/activity-actions"

export default async function HomePage() {
  // Load minimal counts from the database
  const [clubs, events, students, activities] = await Promise.all([
    getClubs(),
    getEvents(),
    getStudents(),
    getActivities(),
  ])

  const stats = [
    { title: "Total Clubs", value: String(clubs.length), icon: Users, color: "text-blue-500 bg-blue-500/10", change: "" },
    { title: "Upcoming Events", value: String(events.length), icon: Calendar, color: "text-purple-500 bg-purple-500/10", change: "" },
    { title: "Active Students", value: String(students.length), icon: BookOpen, color: "text-green-500 bg-green-500/10", change: "" },
    { title: "Total Activities", value: String(activities.length), icon: Activity, color: "text-orange-500 bg-orange-500/10", change: "" },
  ]

  const recentActivities: { type: string; name: string; time: string }[] = []
  const clubsByCategory: { category: string; count: number; percentage: number }[] = []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Welcome to Campus Management System</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-8 py-6 space-y-6">
        {/* Statistics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`rounded-full p-2 ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {stat.change && stat.change.startsWith("+") && <TrendingUp className="h-3 w-3 text-green-600" />}
                  {stat.change && stat.change.startsWith("-") && <TrendingDown className="h-3 w-3 text-red-600" />}
                  <p className="text-xs text-muted-foreground">{stat.change || ""}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates from the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No recent activities yet</p>
                ) : (
                  recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{activity.type}</p>
                        <p className="text-sm text-muted-foreground">{activity.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Clubs by Category (placeholder) */}
          <Card>
            <CardHeader>
              <CardTitle>Clubs by Category</CardTitle>
              <CardDescription>Distribution of clubs across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clubsByCategory.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No category data yet</p>
                ) : (
                  clubsByCategory.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">{item.category}</span>
                        <span className="text-muted-foreground">{item.count} clubs ({item.percentage}%)</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Overview */}
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>Key metrics and performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                    <p className="text-2xl font-bold text-foreground mt-1">78%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">+12% from last month</p>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Event Attendance</p>
                    <p className="text-2xl font-bold text-foreground mt-1">92%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">+5% from last month</p>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Resource Utilization</p>
                    <p className="text-2xl font-bold text-foreground mt-1">65%</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Optimal usage level</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
