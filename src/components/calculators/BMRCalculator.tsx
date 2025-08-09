'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BMRResults {
  bmr: number
  sedentary: number
  lightlyActive: number
  moderatelyActive: number
  veryActive: number
  extremelyActive: number
}

const BMRCalculator = () => {
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [results, setResults] = useState<BMRResults | null>(null)

  const calculateBMR = () => {
    const ageNum = parseInt(age)
    const weightLbs = parseFloat(weight)
    const heightInches = parseFloat(height)

    if (!ageNum || !weightLbs || !heightInches) return

    // Convert pounds to kg and inches to cm for Mifflin-St Jeor equation
    const weightKg = weightLbs * 0.453592
    const heightCm = heightInches * 2.54

    let bmr: number

    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageNum)
    } else {
      bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * ageNum)
    }

    const tdeeMultipliers = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extremelyActive: 1.9
    }

    setResults({
      bmr: Math.round(bmr),
      sedentary: Math.round(bmr * tdeeMultipliers.sedentary),
      lightlyActive: Math.round(bmr * tdeeMultipliers.lightlyActive),
      moderatelyActive: Math.round(bmr * tdeeMultipliers.moderatelyActive),
      veryActive: Math.round(bmr * tdeeMultipliers.veryActive),
      extremelyActive: Math.round(bmr * tdeeMultipliers.extremelyActive)
    })
  }

  return (
    <div className="space-y-6">
      <Tabs value={gender} onValueChange={(value) => setGender(value as 'male' | 'female')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="male">Male</TabsTrigger>
          <TabsTrigger value="female">Female</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age (years)</Label>
          <Input
            id="age"
            type="number"
            placeholder="25"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (lbs)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="154"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (inches)</Label>
          <Input
            id="height"
            type="number"
            placeholder="69"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={calculateBMR} className="w-full">
        Calculate BMR & TDEE
      </Button>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>BMR (Basal Metabolic Rate)</CardTitle>
              <CardDescription>
                Calories your body needs at rest
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {results.bmr} calories/day
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>TDEE (Total Daily Energy Expenditure)</CardTitle>
              <CardDescription>
                Calories based on activity level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Sedentary (little/no exercise)</span>
                <span className="font-semibold">{results.sedentary} cal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Lightly active (1-3 days/week)</span>
                <span className="font-semibold">{results.lightlyActive} cal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Moderately active (3-5 days/week)</span>
                <span className="font-semibold">{results.moderatelyActive} cal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Very active (6-7 days/week)</span>
                <span className="font-semibold">{results.veryActive} cal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Extremely active (2x/day)</span>
                <span className="font-semibold">{results.extremelyActive} cal</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default BMRCalculator