'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, TrendingDown, TrendingUp, Minus } from "lucide-react"

interface ProgressEntry {
  id: string
  date: string
  weight: number
  bodyFat?: number
  muscleMass?: number
  waist?: number
  chest?: number
  arms?: number
  thighs?: number
  notes?: string
}

const ProgressTracker = () => {
  const [entries, setEntries] = useState<ProgressEntry[]>([])
  const [newEntry, setNewEntry] = useState({
    weight: '',
    bodyFat: '',
    muscleMass: '',
    waist: '',
    chest: '',
    arms: '',
    thighs: '',
    notes: ''
  })

  const addEntry = () => {
    if (!newEntry.weight) return

    const entry: ProgressEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(newEntry.weight),
      bodyFat: newEntry.bodyFat ? parseFloat(newEntry.bodyFat) : undefined,
      muscleMass: newEntry.muscleMass ? parseFloat(newEntry.muscleMass) : undefined,
      waist: newEntry.waist ? parseFloat(newEntry.waist) : undefined,
      chest: newEntry.chest ? parseFloat(newEntry.chest) : undefined,
      arms: newEntry.arms ? parseFloat(newEntry.arms) : undefined,
      thighs: newEntry.thighs ? parseFloat(newEntry.thighs) : undefined,
      notes: newEntry.notes || undefined
    }

    setEntries(prev => [entry, ...prev])
    setNewEntry({
      weight: '',
      bodyFat: '',
      muscleMass: '',
      waist: '',
      chest: '',
      arms: '',
      thighs: '',
      notes: ''
    })
  }

  const removeEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id))
  }

  const getLatestEntry = () => entries[0]
  const getPreviousEntry = () => entries[1]

  const getChange = (current?: number, previous?: number) => {
    if (!current || !previous) return null
    return current - previous
  }

  const formatChange = (change: number | null, unit: string = 'lbs') => {
    if (change === null) return '—'
    const sign = change > 0 ? '+' : ''
    return `${sign}${change.toFixed(1)}${unit}`
  }

  const getChangeIcon = (change: number | null, isWeightLoss: boolean = true) => {
    if (change === null) return null
    const isPositive = change > 0
    const isGood = isWeightLoss ? !isPositive : isPositive
    
    if (change === 0) return <Minus className="w-4 h-4 text-gray-500" />
    if (isGood) return <TrendingDown className="w-4 h-4 text-green-500" />
    return <TrendingUp className="w-4 h-4 text-red-500" />
  }

  const latest = getLatestEntry()
  const previous = getPreviousEntry()

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="add-entry">Add Entry</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {latest ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Weight
                    {getChangeIcon(getChange(latest.weight, previous?.weight))}
                  </CardTitle>
                  <CardDescription>Latest: {latest.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {latest.weight} lbs
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatChange(getChange(latest.weight, previous?.weight))}
                  </div>
                </CardContent>
              </Card>

              {latest.bodyFat && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Body Fat
                      {getChangeIcon(getChange(latest.bodyFat, previous?.bodyFat))}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {latest.bodyFat}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatChange(getChange(latest.bodyFat, previous?.bodyFat), '%')}
                    </div>
                  </CardContent>
                </Card>
              )}

              {latest.muscleMass && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Muscle Mass
                      {getChangeIcon(getChange(latest.muscleMass, previous?.muscleMass), false)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {latest.muscleMass} lbs
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatChange(getChange(latest.muscleMass, previous?.muscleMass))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {(latest.waist || latest.chest || latest.arms || latest.thighs) && (
                <Card className="md:col-span-2 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Body Measurements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {latest.waist && (
                        <div className="text-center">
                          <div className="text-lg font-semibold">{latest.waist} in</div>
                          <div className="text-sm text-muted-foreground">Waist</div>
                          <div className="text-xs text-muted-foreground">
                            {formatChange(getChange(latest.waist, previous?.waist), 'in')}
                          </div>
                        </div>
                      )}
                      {latest.chest && (
                        <div className="text-center">
                          <div className="text-lg font-semibold">{latest.chest} in</div>
                          <div className="text-sm text-muted-foreground">Chest</div>
                          <div className="text-xs text-muted-foreground">
                            {formatChange(getChange(latest.chest, previous?.chest), 'in')}
                          </div>
                        </div>
                      )}
                      {latest.arms && (
                        <div className="text-center">
                          <div className="text-lg font-semibold">{latest.arms} in</div>
                          <div className="text-sm text-muted-foreground">Arms</div>
                          <div className="text-xs text-muted-foreground">
                            {formatChange(getChange(latest.arms, previous?.arms), 'in')}
                          </div>
                        </div>
                      )}
                      {latest.thighs && (
                        <div className="text-center">
                          <div className="text-lg font-semibold">{latest.thighs} in</div>
                          <div className="text-sm text-muted-foreground">Thighs</div>
                          <div className="text-xs text-muted-foreground">
                            {formatChange(getChange(latest.thighs, previous?.thighs), 'in')}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No progress entries yet. Add your first entry to get started!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="add-entry">
          <Card>
            <CardHeader>
              <CardTitle>Add Progress Entry</CardTitle>
              <CardDescription>
                Record your measurements and track your progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="154.0"
                    value={newEntry.weight}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, weight: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bodyFat">Body Fat (%)</Label>
                  <Input
                    id="bodyFat"
                    type="number"
                    step="0.1"
                    placeholder="15.0"
                    value={newEntry.bodyFat}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, bodyFat: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="muscleMass">Muscle Mass (lbs)</Label>
                  <Input
                    id="muscleMass"
                    type="number"
                    step="0.1"
                    placeholder="132.0"
                    value={newEntry.muscleMass}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, muscleMass: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist">Waist (in)</Label>
                  <Input
                    id="waist"
                    type="number"
                    step="0.1"
                    placeholder="33.5"
                    value={newEntry.waist}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, waist: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chest">Chest (in)</Label>
                  <Input
                    id="chest"
                    type="number"
                    step="0.1"
                    placeholder="39.5"
                    value={newEntry.chest}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, chest: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arms">Arms (in)</Label>
                  <Input
                    id="arms"
                    type="number"
                    step="0.1"
                    placeholder="13.8"
                    value={newEntry.arms}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, arms: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thighs">Thighs (in)</Label>
                  <Input
                    id="thighs"
                    type="number"
                    step="0.1"
                    placeholder="23.6"
                    value={newEntry.thighs}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, thighs: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    placeholder="How are you feeling today?"
                    value={newEntry.notes}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>
              </div>
              <Button onClick={addEntry} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Entry
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Progress History</CardTitle>
              <CardDescription>
                View all your progress entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              {entries.length > 0 ? (
                <div className="space-y-4">
                  {entries.map(entry => (
                    <div key={entry.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{entry.date}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEntry(entry.id)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Weight:</span> {entry.weight} lbs
                        </div>
                        {entry.bodyFat && (
                          <div>
                            <span className="text-muted-foreground">Body Fat:</span> {entry.bodyFat}%
                          </div>
                        )}
                        {entry.muscleMass && (
                          <div>
                            <span className="text-muted-foreground">Muscle:</span> {entry.muscleMass} lbs
                          </div>
                        )}
                        {entry.waist && (
                          <div>
                            <span className="text-muted-foreground">Waist:</span> {entry.waist} in
                          </div>
                        )}
                      </div>
                      {entry.notes && (
                        <div className="mt-2 text-sm text-muted-foreground italic">
                          &ldquo;{entry.notes}&rdquo;
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No entries yet. Add your first entry to start tracking!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProgressTracker