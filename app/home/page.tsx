import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Trophy, 
  Users, 
  Calendar, 
  Activity, 
  Zap, 
  Shield, 
  BarChart3, 
  ChevronRight,
  LayoutDashboard,
  MapPin,
  Clock,
  CheckCircle2
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/home">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg mr-2">
            <Trophy className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">slak ajmi</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
            Features
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">
              Log in
            </Link>
          </Button>
          <Button asChild variant="default" size="sm">
            <Link href="/register">
              Sign up
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent -z-10" />
          <div className="container px-4 md:px-6 mx-auto relative">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-4">
                  Welcome to the Future of Campus Management
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Empower Your Student Life with <span className="text-primary">slak ajmi</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                  The all-in-one platform for managing clubs, events, and student engagement. 
                  Streamline operations, boost participation, and build a vibrant campus community.
                </p>
              </div>
              <div className="space-x-4 pt-4">
                <Button asChild size="lg" className="px-8 shadow-lg hover:shadow-primary/20 transition-all">
                  <Link href="/register">Get Started <ChevronRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8" asChild>
                  <Link href="/login">Admin Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">Powerful Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your campus organizations effectively.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Users className="h-10 w-10" />}
                title="Club Management"
                description="Easily manage club memberships, categories, and leadership roles in one central location."
              />
              <FeatureCard 
                icon={<Calendar className="h-10 w-10" />}
                title="Event Scheduling"
                description="Plan, organize, and track campus events with ease. Manage attendance and guest lists effortlessly."
              />
              <FeatureCard 
                icon={<Activity className="h-10 w-10" />}
                title="Activity Tracking"
                description="Monitor student participation and engagement across various campus activities in real-time."
              />
              <FeatureCard 
                icon={<MapPin className="h-10 w-10" />}
                title="Resource Allocation"
                description="Manage campus resources and facilities. Ensure optimal utilization for all club activities."
              />
              <FeatureCard 
                icon={<BarChart3 className="h-10 w-10" />}
                title="Advanced Analytics"
                description="Get insights into club performance and student engagement with our comprehensive dashboard."
              />
              <FeatureCard 
                icon={<Shield className="h-10 w-10" />}
                title="Secure & Reliable"
                description="Your data is protected with enterprise-grade security. Built for performance and reliability."
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl font-bold tracking-tighter">50+</h3>
                <p className="text-primary-foreground/80 font-medium uppercase tracking-wider text-sm">Active Clubs</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold tracking-tighter">1.2k</h3>
                <p className="text-primary-foreground/80 font-medium uppercase tracking-wider text-sm">Students</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold tracking-tighter">200+</h3>
                <p className="text-primary-foreground/80 font-medium uppercase tracking-wider text-sm">Events Yearly</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold tracking-tighter">95%</h3>
                <p className="text-primary-foreground/80 font-medium uppercase tracking-wider text-sm">Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background border-t">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to transform your campus?</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-4">
                  Join hundreds of students and faculty members who are already using slak ajmi to manage their campus life.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2 mt-6">
                <Button className="w-full" size="lg" asChild>
                  <Link href="/">Launch Dashboard Now</Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  No credit card required. Start managing your clubs today.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-card">
        <p className="text-xs text-muted-foreground">© 2025 slak ajmi. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-md group">
      <div className="p-3 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-center text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}
