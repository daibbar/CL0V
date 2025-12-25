import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Activity, BookOpen, TrendingUp, TrendingDown, ArrowUpRight, Trophy, Clock } from "lucide-react"
import { 
  getDashboardStats, 
  getRecentActivities, 
  getClubCategoryStats, 
  getEngagementMetrics 
} from "@/actions/dashboard-actions"
import { Button } from "@/components/ui/button"

export default async function HomePage() {
  const [dashboardStats, recentActivities, clubsByCategory, engagementMetrics] = await Promise.all([
    getDashboardStats(),
    getRecentActivities(),
    getClubCategoryStats(),
    getEngagementMetrics()
  ])

  const stats = [
    { 
      title: "Total Clubs", 
      value: String(dashboardStats.clubCount), 
      icon: Users, 
      color: "from-blue-500 to-blue-600",
      lightColor: "bg-blue-50 text-blue-700",
      change: "+12% from last month" 
    },
    { 
      title: "Upcoming Events", 
      value: String(dashboardStats.upcomingEventsCount), 
      icon: Calendar, 
      color: "from-red-500 to-red-600",
      lightColor: "bg-red-50 text-red-700",
      change: "+4 new this week" 
    },
    { 
      title: "Active Students", 
      value: String(dashboardStats.activeStudentsCount), 
      icon: BookOpen, 
      color: "from-emerald-500 to-emerald-600",
      lightColor: "bg-emerald-50 text-emerald-700",
      change: "+24% participation" 
    },
    { 
      title: "Total Activities", 
      value: String(dashboardStats.activityCount), 
      icon: Activity, 
      color: "from-amber-500 to-amber-600",
      lightColor: "bg-amber-50 text-amber-700",
      change: "+8% vs last year" 
    },
  ]

  return (
    <div className="min-h-screen bg-muted/20 pb-12">
      {/* Welcome Header Section */}
      <div className="px-6 pt-6">
        <div className="max-w-6xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-2xl relative">
          {/* Decorative shapes for modern look */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />
          
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Live Campus Updates
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Dashboard Overview</h1>
              <p className="text-primary-foreground/80 text-lg max-w-xl">
                Manage ENSA Khouribga's vibrant community. Your central hub for clubs, events, and student engagement.
              </p>
            </div>
            <div className="hidden lg:block">
               <Trophy className="h-24 w-24 text-white/20 rotate-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 mt-8 space-y-8">
        
        {/* Statistics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl bg-card/50 backdrop-blur-sm border border-white/20">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-xl ring-4 ring-white/10`}>
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter flex items-center gap-1 ${stat.lightColor} shadow-sm`}>
                    <ArrowUpRight className="h-3 w-3" />
                    {stat.change.split(' ')[0]}
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-muted-foreground tracking-widest uppercase">{stat.title}</h3>
                  <div className="text-4xl font-black text-foreground tabular-nums tracking-tighter">{stat.value}</div>
                  <p className="text-[10px] text-muted-foreground/60 font-medium mt-2">{stat.change.split(' ').slice(1).join(' ')}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activities */}
          <Card className="lg:col-span-2 border-none shadow-xl rounded-3xl overflow-hidden bg-card/50 backdrop-blur-sm border border-white/10">
            <CardHeader className="border-b bg-card/30 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold tracking-tight">Recent Activities</CardTitle>
                  <CardDescription>Latest events and club meetings scheduled</CardDescription>
                </div>
                <Badge variant="secondary" className="px-4 py-1.5 rounded-full font-bold">Live Feed</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {recentActivities.length === 0 ? (
                  <div className="p-12 text-center text-muted-foreground italic">No recent activities found</div>
                ) : (
                  recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-6 p-8 hover:bg-muted/40 transition-all duration-300 group">
                      <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground font-black shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-xl">{new Date(activity.time).getDate()}</span>
                        <span className="text-[10px] uppercase tracking-widest opacity-80">{new Date(activity.time).toLocaleString('default', { month: 'short' })}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-xl text-foreground truncate">{activity.name}</h4>
                          <Badge variant="outline" className="text-[10px] h-6 px-3 border-primary/20 text-primary uppercase font-black">{activity.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-3 font-medium">
                          <Clock className="h-4 w-4 text-primary/60" />
                          {new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          <span className="w-1.5 h-1.5 rounded-full bg-border" />
                          <span>ENSA Campus</span>
                        </p>
                      </div>
                      <div className="hidden sm:block">
                        <Button variant="ghost" size="sm" className="rounded-full font-bold group-hover:bg-primary group-hover:text-primary-foreground">
                          Details
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* System Overview & Clubs */}
          <div className="space-y-6">
            <Card className="border-none shadow-xl rounded-3xl bg-gradient-to-br from-card to-muted/30 border border-white/10">
              <CardHeader className="px-8 pt-8">
                <CardTitle className="text-xl font-bold">Engagement Metrics</CardTitle>
                <CardDescription>Student participation overview</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Club Participation</span>
                    <span className="font-black text-lg text-foreground">{engagementMetrics.engagementRate}%</span>
                  </div>
                  <div className="h-4 w-full rounded-full bg-muted overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" 
                      style={{ width: `${engagementMetrics.engagementRate}%` }} 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Event Attendance</span>
                    <span className="font-black text-lg text-foreground">{engagementMetrics.eventAttendanceRate}%</span>
                  </div>
                  <div className="h-4 w-full rounded-full bg-muted overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-accent to-accent/60 rounded-full" 
                      style={{ width: `${engagementMetrics.eventAttendanceRate}%` }} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl rounded-3xl bg-card border border-white/10 overflow-hidden">
              <CardHeader className="px-8 pt-8">
                <CardTitle className="text-xl font-bold">Clubs by Category</CardTitle>
                <CardDescription>Distribution across fields</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-6">
                  {clubsByCategory.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">No data available</p>
                  ) : (
                    clubsByCategory.map((item, i) => (
                      <div key={item.category} className="flex items-center gap-5 group">
                        <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                          i % 2 === 0 ? 'bg-primary/10 text-primary shadow-lg shadow-primary/5' : 'bg-accent/10 text-accent shadow-lg shadow-accent/5'
                        }`}>
                          <Trophy className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-bold capitalize text-foreground">{item.category}</span>
                            <span className="text-muted-foreground font-black text-xs">{item.count}</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${
                                i % 2 === 0 ? 'bg-primary' : 'bg-accent'
                              }`} 
                              style={{ width: `${item.percentage}%` }} 
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}