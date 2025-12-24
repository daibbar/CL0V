import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Calendar,
  Activity,
  BookOpen,
  MapPin,
  UserCheck,
  FileText,
  UserPlus,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

export default function HomePage() {
  // Mock statistics data
  const stats = [
    {
      title: "Total Clubs",
      value: "12",
      change: "+2 this month",
      trend: "up",
      icon: Users,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      title: "Upcoming Events",
      value: "8",
      change: "3 this week",
      trend: "up",
      icon: Calendar,
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      title: "Active Students",
      value: "245",
      change: "+18 this month",
      trend: "up",
      icon: BookOpen,
      color: "text-green-500 bg-green-500/10",
    },
    {
      title: "Total Activities",
      value: "32",
      change: "+5 this month",
      trend: "up",
      icon: Activity,
      color: "text-orange-500 bg-orange-500/10",
    },
    {
      title: "Resources",
      value: "15",
      change: "12 available",
      trend: "neutral",
      icon: MapPin,
      color: "text-red-500 bg-red-500/10",
    },
    {
      title: "Memberships",
      value: "156",
      change: "+24 this month",
      trend: "up",
      icon: UserCheck,
      color: "text-teal-500 bg-teal-500/10",
    },
    {
      title: "Reservations",
      value: "28",
      change: "8 pending",
      trend: "neutral",
      icon: FileText,
      color: "text-indigo-500 bg-indigo-500/10",
    },
    {
      title: "Registered Guests",
      value: "42",
      change: "+6 this week",
      trend: "up",
      icon: UserPlus,
      color: "text-pink-500 bg-pink-500/10",
    },
  ]

  const recentActivities = [
    { type: "Club Created", name: "Photography Club", time: "2 hours ago" },
    { type: "Event Scheduled", name: "Tech Conference 2024", time: "5 hours ago" },
    { type: "Student Registered", name: "John Doe joined Drama Club", time: "1 day ago" },
    { type: "Resource Reserved", name: "Amphitheater A booked", time: "2 days ago" },
  ]

  const clubsByCategory = [
    { category: "Technological", count: 4, percentage: 33 },
    { category: "Sport", count: 3, percentage: 25 },
    { category: "Entertainment", count: 3, percentage: 25 },
    { category: "Social Entrepreneurship", count: 2, percentage: 17 },
  ]

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
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                  {stat.trend === "down" && <TrendingDown className="h-3 w-3 text-red-600" />}
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
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
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="rounded-full bg-primary/10 p-2">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.type}</p>
                      <p className="text-sm text-muted-foreground">{activity.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Clubs by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Clubs by Category</CardTitle>
              <CardDescription>Distribution of clubs across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clubsByCategory.map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{item.category}</span>
                      <span className="text-muted-foreground">
                        {item.count} clubs ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
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
