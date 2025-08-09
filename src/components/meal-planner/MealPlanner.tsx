'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2 } from "lucide-react"

interface Meal {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface DayPlan {
  breakfast: Meal[]
  lunch: Meal[]
  dinner: Meal[]
  snacks: Meal[]
}

const MealPlanner = () => {
  const [currentDay, setCurrentDay] = useState('monday')
  const [mealPlans, setMealPlans] = useState<{ [key: string]: DayPlan }>({
    monday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    tuesday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    wednesday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    thursday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    friday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    saturday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    sunday: { breakfast: [], lunch: [], dinner: [], snacks: [] }
  })

  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  })

  const addMeal = (mealType: keyof DayPlan) => {
    if (!newMeal.name || !newMeal.calories) return

    const meal: Meal = {
      id: Date.now().toString(),
      name: newMeal.name,
      calories: parseInt(newMeal.calories) || 0,
      protein: parseInt(newMeal.protein) || 0,
      carbs: parseInt(newMeal.carbs) || 0,
      fat: parseInt(newMeal.fat) || 0
    }

    setMealPlans(prev => ({
      ...prev,
      [currentDay]: {
        ...prev[currentDay],
        [mealType]: [...prev[currentDay][mealType], meal]
      }
    }))

    setNewMeal({ name: '', calories: '', protein: '', carbs: '', fat: '' })
  }

  const removeMeal = (mealType: keyof DayPlan, mealId: string) => {
    setMealPlans(prev => ({
      ...prev,
      [currentDay]: {
        ...prev[currentDay],
        [mealType]: prev[currentDay][mealType].filter(meal => meal.id !== mealId)
      }
    }))
  }

  const getTotalNutrition = (meals: Meal[]) => {
    return meals.reduce(
      (total, meal) => ({
        calories: total.calories + meal.calories,
        protein: total.protein + meal.protein,
        carbs: total.carbs + meal.carbs,
        fat: total.fat + meal.fat
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    )
  }

  const getDayTotal = (dayPlan: DayPlan) => {
    const allMeals = [...dayPlan.breakfast, ...dayPlan.lunch, ...dayPlan.dinner, ...dayPlan.snacks]
    return getTotalNutrition(allMeals)
  }

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  return (
    <div className="space-y-6">
      <Tabs value={currentDay} onValueChange={setCurrentDay}>
        <TabsList className="grid w-full grid-cols-7">
          {days.map(day => (
            <TabsTrigger key={day} value={day} className="text-xs">
              {day.charAt(0).toUpperCase() + day.slice(1, 3)}
            </TabsTrigger>
          ))}
        </TabsList>

        {days.map(day => (
          <TabsContent key={day} value={day}>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Summary - {day.charAt(0).toUpperCase() + day.slice(1)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {getDayTotal(mealPlans[day]).calories}
                      </div>
                      <div className="text-sm text-muted-foreground">Calories</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {getDayTotal(mealPlans[day]).protein}g
                      </div>
                      <div className="text-sm text-muted-foreground">Protein</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {getDayTotal(mealPlans[day]).carbs}g
                      </div>
                      <div className="text-sm text-muted-foreground">Carbs</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">
                        {getDayTotal(mealPlans[day]).fat}g
                      </div>
                      <div className="text-sm text-muted-foreground">Fat</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(['breakfast', 'lunch', 'dinner', 'snacks'] as const).map(mealType => (
                  <Card key={mealType}>
                    <CardHeader>
                      <CardTitle className="capitalize">{mealType}</CardTitle>
                      <CardDescription>
                        {getTotalNutrition(mealPlans[day][mealType]).calories} calories
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {mealPlans[day][mealType].map(meal => (
                        <div key={meal.id} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <div className="font-medium">{meal.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {meal.calories} cal • {meal.protein}p • {meal.carbs}c • {meal.fat}f
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMeal(mealType, meal.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <div className="border-t pt-3 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Meal name"
                            value={newMeal.name}
                            onChange={(e) => setNewMeal(prev => ({ ...prev, name: e.target.value }))}
                          />
                          <Input
                            placeholder="Calories"
                            type="number"
                            value={newMeal.calories}
                            onChange={(e) => setNewMeal(prev => ({ ...prev, calories: e.target.value }))}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            placeholder="Protein (g)"
                            type="number"
                            value={newMeal.protein}
                            onChange={(e) => setNewMeal(prev => ({ ...prev, protein: e.target.value }))}
                          />
                          <Input
                            placeholder="Carbs (g)"
                            type="number"
                            value={newMeal.carbs}
                            onChange={(e) => setNewMeal(prev => ({ ...prev, carbs: e.target.value }))}
                          />
                          <Input
                            placeholder="Fat (g)"
                            type="number"
                            value={newMeal.fat}
                            onChange={(e) => setNewMeal(prev => ({ ...prev, fat: e.target.value }))}
                          />
                        </div>
                        <Button 
                          onClick={() => addMeal(mealType)} 
                          className="w-full"
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Meal
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default MealPlanner