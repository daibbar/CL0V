import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Trophy, 
  Users, 
  Calendar, 
  Activity, 
  Shield, 
  BarChart3, 
  ChevronRight,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Clock,
  UserPlus
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Navigation */}
      <header className="px-6 lg:px-8 h-20 flex items-center border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
        <Link className="flex items-center justify-center group" href="/home">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-2 rounded-xl mr-3 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">CL0V</span>
        </Link>
        <nav className="ml-auto flex gap-6 items-center">
          <Link className="text-sm font-semibold hover:text-blue-300 transition-colors hidden sm:block" href="#features">
            Features
          </Link>
          <Link className="text-sm font-semibold hover:text-blue-300 transition-colors hidden sm:block" href="#stats">
            Why CL0V
          </Link>
          <Button asChild variant="ghost" size="sm" className="hover:bg-white/10 text-white">
            <Link href="/login">
              Log in
            </Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/30 border-0">
            <Link href="/register">
              Get Started
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container px-6 md:px-8 mx-auto relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-4 py-2 text-sm font-semibold text-blue-300 border border-blue-400/30 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                ENSA Khouribga
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent animate-gradient">
                  CL0V
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100/80 max-w-3xl leading-relaxed font-light">
                The central hub for club management and parascolaire activities at École Nationale des Sciences Appliquées de Khouribga.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-2xl shadow-blue-500/40 border-0 group">
                  <Link href="/register">
                    Student Sign Up
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 border-white/20 bg-transparent hover:bg-white/10 backdrop-blur-sm text-white" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap justify-center gap-8 pt-12 text-sm text-blue-200/60">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span>For ENSA Students & Admins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-cyan-400" />
                  <span>Manage Clubs & Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-blue-400" />
                  <span>Track Your Activities</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-32 relative">
          <div className="container px-6 md:px-8 mx-auto relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 border border-blue-400/20">
                <Zap className="h-4 w-4" />
                Powerful Features
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Everything You Need</h2>
              <p className="max-w-2xl text-lg text-blue-100/70">
                Everything you need to manage parascolaire activities at ENSA Khouribga.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<Users className="h-8 w-8" />}
                title="Club Management"
                description="Create, manage, and grow campus clubs. Handle memberships, roles, and approval workflows seamlessly."
                gradient="from-blue-500 to-cyan-400"
              />
              <FeatureCard 
                icon={<Calendar className="h-8 w-8" />}
                title="Event Orchestration"
                description="Plan campus-wide events with multi-club collaboration. Track attendance and manage registrations effortlessly."
                gradient="from-purple-500 to-pink-400"
              />
              <FeatureCard 
                icon={<Activity className="h-8 w-8" />}
                title="Activity Tracking"
                description="Monitor workshops, keynotes, and sessions. Students can register for specific activities they love."
                gradient="from-orange-500 to-yellow-400"
              />
              <FeatureCard 
                icon={<MapPin className="h-8 w-8" />}
                title="Resource Allocation"
                description="Manage campus facilities and spaces. Book amphitheaters, labs, and rooms with intelligent scheduling."
                gradient="from-green-500 to-emerald-400"
              />
              <FeatureCard 
                icon={<BarChart3 className="h-8 w-8" />}
                title="Real-Time Analytics"
                description="Get instant insights into engagement metrics, club performance, and student participation trends."
                gradient="from-indigo-500 to-blue-400"
              />
              <FeatureCard 
                icon={<Shield className="h-8 w-8" />}
                title="Enterprise Security"
                description="Role-based access control, encrypted data, and secure authentication protect your campus information."
                gradient="from-red-500 to-rose-400"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="w-full py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-3xl"></div>
          <div className="container px-6 md:px-8 mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Powering ENSA Khouribga</h2>
              <p className="text-xl text-blue-100/70">Real numbers from our vibrant campus community</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCard number="50+" label="Active Clubs" icon={<Trophy className="h-8 w-8" />} />
              <StatCard number="1,200+" label="Students" icon={<Users className="h-8 w-8" />} />
              <StatCard number="200+" label="Events/Year" icon={<Calendar className="h-8 w-8" />} />
              <StatCard number="95%" label="Satisfaction" icon={<Sparkles className="h-8 w-8" />} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 relative">
          <div className="container px-6 md:px-8 mx-auto relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCA0IDQgNCA0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Get Started?</h2>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Access your clubs, events, and activities. Login or create your student account now.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="text-lg px-10 py-6 bg-white text-blue-600 hover:bg-blue-50 shadow-xl" asChild>
                      <Link href="/register">
                        <UserPlus className="mr-2 h-5 w-5" />
                        Sign Up
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-white bg-transparent text-white hover:bg-white/10 shadow-xl" asChild>
                      <Link href="/login">
                        Login
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>


    </div>
  )
}

function FeatureCard({ icon, title, description, gradient }: { 
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}) {
  return (
    <div className="group relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} text-white mb-6 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-blue-100/70 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}

function StatCard({ number, label, icon }: { number: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="text-center group">
      <div className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-sm mb-4 group-hover:bg-white/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
        {number}
      </h3>
      <p className="text-blue-200/70 font-medium tracking-wide text-sm uppercase">{label}</p>
    </div>
  )
}