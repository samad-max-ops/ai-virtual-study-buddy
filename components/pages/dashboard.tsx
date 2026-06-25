"use client"

import { motion } from "framer-motion"
import {
  Flame,
  Clock,
  Target,
  TrendingUp,
  Calendar,
  Sparkles,
  BookOpen,
  Brain,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const stats = [
  {
    label: "Study Streak",
    value: "12",
    unit: "days",
    icon: Flame,
    color: "from-orange-500 to-red-500",
    change: "+3 this week",
  },
  {
    label: "Total Hours",
    value: "47.5",
    unit: "hrs",
    icon: Clock,
    color: "from-primary to-accent",
    change: "This month",
  },
  {
    label: "Productivity",
    value: "87",
    unit: "%",
    icon: Target,
    color: "from-accent to-emerald-500",
    change: "+12% vs last week",
  },
  {
    label: "Tasks Done",
    value: "24",
    unit: "/30",
    icon: TrendingUp,
    color: "from-blue-500 to-primary",
    change: "This week",
  },
]

const upcomingTasks = [
  { title: "Physics Assignment", subject: "Physics", due: "Today, 5:00 PM", priority: "high" },
  { title: "Literature Essay", subject: "English", due: "Tomorrow", priority: "medium" },
  { title: "Math Practice", subject: "Calculus", due: "In 2 days", priority: "low" },
]

const subjects = [
  { name: "Mathematics", progress: 78, color: "bg-primary" },
  { name: "Physics", progress: 65, color: "bg-accent" },
  { name: "Literature", progress: 92, color: "bg-chart-3" },
  { name: "Chemistry", progress: 54, color: "bg-chart-4" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function DashboardPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 p-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="relative overflow-hidden">
        <Card className="glass-card border-glass-border overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="relative p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium">AI Insight</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Welcome back, Student!
                </h1>
                <p className="text-muted-foreground max-w-lg">
                  {"You're on a 12-day streak! Your focus has improved by 23% this week. Keep up the momentum - you're making great progress in Physics."}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
              >
                <Brain className="w-4 h-4" />
                Start Study Session
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card border-glass-border hover:border-primary/30 transition-colors group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                      <span className="text-sm text-muted-foreground">{stat.unit}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </div>
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-5 h-5 text-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Tasks */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="glass-card border-glass-border h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming Tasks
                </CardTitle>
                <button className="text-sm text-primary hover:underline">View All</button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <motion.div
                  key={task.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                >
                  <div className={`w-2 h-10 rounded-full ${
                    task.priority === "high" ? "bg-destructive" :
                    task.priority === "medium" ? "bg-chart-4" : "bg-accent"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{task.title}</h4>
                    <p className="text-sm text-muted-foreground">{task.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{task.due}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      task.priority === "high" ? "bg-destructive/20 text-destructive" :
                      task.priority === "medium" ? "bg-chart-4/20 text-chart-4" : "bg-accent/20 text-accent"
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Subject Progress */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-glass-border h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BookOpen className="w-5 h-5 text-primary" />
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjects.map((subject, index) => (
                <motion.div
                  key={subject.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{subject.name}</span>
                    <span className="text-muted-foreground">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Insights Card */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card border-glass-border overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
          <CardContent className="relative p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-foreground">AI Study Recommendations</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Consider reviewing Physics Chapter 5 - your practice scores suggest this needs attention.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Your peak productivity hours are 9 AM - 12 PM. Schedule difficult tasks during this time.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-chart-3">•</span>
                    You excel in Literature! Consider helping peers or exploring advanced topics.
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
