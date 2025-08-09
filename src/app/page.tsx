import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, UtensilsCrossed, TrendingUp, Target } from "lucide-react"
import BMRCalculator from "@/components/calculators/BMRCalculator"
import MealPlanner from "@/components/meal-planner/MealPlanner"
import ProgressTracker from "@/components/progress/ProgressTracker"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Nutrition Tracker</h1>
        <p className="text-xl text-muted-foreground">
          Your comprehensive nutrition and fitness companion - Track, Plan, Progress!
        </p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Calculator
          </TabsTrigger>
          <TabsTrigger value="meals" className="flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4" />
            Meal Planning
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Goals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <Card>
            <CardHeader>
              <CardTitle>BMR & TDEE Calculator</CardTitle>
              <CardDescription>
                Calculate your Basal Metabolic Rate and Total Daily Energy Expenditure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BMRCalculator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meals">
          <Card>
            <CardHeader>
              <CardTitle>Meal Planning</CardTitle>
              <CardDescription>
                Plan your daily meals and track nutritional intake
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MealPlanner />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your weight, measurements, and fitness goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressTracker />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>Goals & Targets</CardTitle>
              <CardDescription>
                Set and track your nutrition and fitness objectives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Goals feature coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
