"use client"
import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth/auth-context"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, TrendingDown, Clock, Target, Brain, Flame, BookOpen, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const weeklyHoursData = [
  { day: "Mon", hours: 4.5 },
  { day: "Tue", hours: 5.2 },
  { day: "Wed", hours: 3.8 },
  { day: "Thu", hours: 6.1 },
  { day: "Fri", hours: 4.9 },
  { day: "Sat", hours: 7.2 },
  { day: "Sun", hours: 3.5 },
]

const subjectProgressData = [
  { name: "Mathematics", value: 35, color: "#38bdf8" },
  { name: "Physics", value: 25, color: "#34d399" },
  { name: "Literature", value: 20, color: "#a78bfa" },
  { name: "Chemistry", value: 15, color: "#fbbf24" },
  { name: "History", value: 5, color: "#f472b6" },
]

const productivityTrendData = [
  { week: "W1", score: 65 },
  { week: "W2", score: 72 },
  { week: "W3", score: 68 },
  { week: "W4", score: 78 },
  { week: "W5", score: 82 },
  { week: "W6", score: 87 },
]

const focusConsistencyData = [
  { day: "Mon", focus: 85, breaks: 15 },
  { day: "Tue", focus: 78, breaks: 22 },
  { day: "Wed", focus: 92, breaks: 8 },
  { day: "Thu", focus: 88, breaks: 12 },
  { day: "Fri", focus: 75, breaks: 25 },
  { day: "Sat", focus: 95, breaks: 5 },
  { day: "Sun", focus: 70, breaks: 30 },
]

const monthlyGoalsData = [
  { month: "Jan", achieved: 12, goal: 15 },
  { month: "Feb", achieved: 14, goal: 15 },
  { month: "Mar", achieved: 18, goal: 20 },
  { month: "Apr", achieved: 22, goal: 20 },
  { month: "May", achieved: 19, goal: 25 },
]


const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            {entry.name}: <span className="text-foreground font-medium">{entry.value}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function AnalyticsPage() {
  const { user } = useAuth()

const [analytics, setAnalytics] = useState({
  totalTasks: 0,
  completedTasks: 0,
  inProgressTasks: 0,
  completionRate: 0,
})
useEffect(() => {
  if (!user) return

  fetch(`http://127.0.0.1:8000/tasks/${user.id}`)
    .then((res) => res.json())
    .then((data) => {
      const tasks = data.tasks || []

      const totalTasks = tasks.length

      const completedTasks = tasks.filter(
        (t: any) => t.status === "completed"
      ).length

      const inProgressTasks = tasks.filter(
        (t: any) => t.status === "inProgress"
      ).length

      const completionRate =
        totalTasks > 0
          ? Math.round((completedTasks / totalTasks) * 100)
          : 0

      setAnalytics({
        totalTasks,
        completedTasks,
        inProgressTasks,
        completionRate,
      })
    })
    .catch(console.error)
}, [user])
const stats = [
  {
    label: "Total Tasks",
    value: analytics.totalTasks,
    change: "",
    trend: "up",
    icon: Target,
  },
  {
    label: "Completed",
    value: analytics.completedTasks,
    change: "",
    trend: "up",
    icon: Flame,
  },
  {
    label: "In Progress",
    value: analytics.inProgressTasks,
    change: "",
    trend: "up",
    icon: Clock,
  },
  {
    label: "Completion %",
    value: `${analytics.completionRate}%`,
    change: "",
    trend: "up",
    icon: Brain,
  },
]
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Track your study progress and productivity trends</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card border-glass-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-accent" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-destructive" />
                      )}
                      <span className={`text-xs ${stat.trend === "up" ? "text-accent" : "text-destructive"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-glass-border">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BarChart3 className="w-5 h-5 text-primary" />
                Weekly Study Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyHoursData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="hours"
                      name="Hours"
                      fill="url(#barGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subject Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card border-glass-border">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BookOpen className="w-5 h-5 text-primary" />
                Subject Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subjectProgressData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {subjectProgressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {subjectProgressData.map((subject) => (
                  <div key={subject.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <span className="text-sm text-muted-foreground">{subject.name}</span>
                    <span className="text-sm font-medium text-foreground ml-auto">{subject.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Productivity Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card border-glass-border">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <TrendingUp className="w-5 h-5 text-accent" />
                Productivity Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={productivityTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="score"
                      name="Score"
                      stroke="#34d399"
                      strokeWidth={2}
                      fill="url(#areaGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Focus Consistency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-card border-glass-border">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Brain className="w-5 h-5 text-primary" />
                Focus Consistency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={focusConsistencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="focus"
                      name="Focus %"
                      stroke="#38bdf8"
                      strokeWidth={2}
                      dot={{ fill: "#38bdf8", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="breaks"
                      name="Break %"
                      stroke="#f472b6"
                      strokeWidth={2}
                      dot={{ fill: "#f472b6", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Monthly Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glass-card border-glass-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Target className="w-5 h-5 text-chart-4" />
              Monthly Goals Achievement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyGoalsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="goal" name="Goal" fill="#374151" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="achieved" name="Achieved" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
