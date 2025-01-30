"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FilterOptionsProps {
  technologies: string[]
  years: number[]
  onFiltersChange: (filters: {
    technologies: string[]
    minReliability: number
    minProbability: number
    years: number[]
  }) => void
}

export default function FilterOptions({ technologies, years, onFiltersChange }: FilterOptionsProps) {
  const [open, setOpen] = useState(false)
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<number[]>([])
  const [minReliability, setMinReliability] = useState(0)
  const [minProbability, setMinProbability] = useState(0)

  const handleTechnologySelect = (technology: string) => {
    const updated = selectedTechnologies.includes(technology)
      ? selectedTechnologies.filter((t) => t !== technology)
      : [...selectedTechnologies, technology]

    setSelectedTechnologies(updated)
    updateFilters(updated, selectedYears, minReliability, minProbability)
  }

  const handleYearSelect = (year: number) => {
    const updated = selectedYears.includes(year) ? selectedYears.filter((y) => y !== year) : [...selectedYears, year]

    setSelectedYears(updated)
    updateFilters(selectedTechnologies, updated, minReliability, minProbability)
  }

  const handleReliabilityChange = (value: number[]) => {
    setMinReliability(value[0])
    updateFilters(selectedTechnologies, selectedYears, value[0], minProbability)
  }

  const handleProbabilityChange = (value: number[]) => {
    setMinProbability(value[0])
    updateFilters(selectedTechnologies, selectedYears, minReliability, value[0])
  }

  const updateFilters = (techs: string[], years: number[], reliability: number, probability: number) => {
    onFiltersChange({
      technologies: techs,
      years: years,
      minReliability: reliability,
      minProbability: probability,
    })
  }

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Technologies</h3>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
              {selectedTechnologies.length === 0 ? "Select technologies..." : `${selectedTechnologies.length} selected`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search technologies..." />
              <CommandList>
                <CommandEmpty>No technology found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {technologies.map((tech) => (
                    <CommandItem key={tech} onSelect={() => handleTechnologySelect(tech)}>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedTechnologies.includes(tech) ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {tech}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {selectedTechnologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTechnologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleTechnologySelect(tech)}
              >
                {tech}
                <span className="ml-1">×</span>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Years</h3>
        <div className="flex flex-wrap gap-2">
          {years.map((year) => (
            <Badge
              key={year}
              variant={selectedYears.includes(year) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleYearSelect(year)}
            >
              {year}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Minimum Reliability Score</h3>
        <Slider defaultValue={[0]} max={100} step={10} onValueChange={handleReliabilityChange} className="w-full" />
        <p className="text-sm text-muted-foreground text-right">{minReliability}%</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Minimum 2025 Probability</h3>
        <Slider defaultValue={[0]} max={100} step={10} onValueChange={handleProbabilityChange} className="w-full" />
        <p className="text-sm text-muted-foreground text-right">{minProbability}%</p>
      </div>
    </div>
  )
}

