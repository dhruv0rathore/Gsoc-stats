"use client"

import { useState, useEffect } from "react"
import OrganizationCard from "./OrganizationCard"
import FilterOptions from "./FilterOptions"
import type { Organization } from "@/types/organization"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

export default function OrganizationList() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [allTechnologies, setAllTechnologies] = useState<string[]>([])
  const [allYears, setAllYears] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch("/api/organizations")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from API")
        }

        // Extract unique technologies and years
        const techs = new Set<string>()
        const years = new Set<number>()
        data.forEach((org) => {
          org.technologies.forEach((tech) => techs.add(tech))
          Object.keys(org.years).forEach((year) => years.add(Number.parseInt(year)))
        })

        setAllTechnologies(Array.from(techs).sort())
        setAllYears(Array.from(years).sort((a, b) => b - a))
        setOrganizations(data)
        setFilteredOrganizations(data)
      } catch (error) {
        console.error("Error fetching organizations:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch organizations")
      } finally {
        setLoading(false)
      }
    }

    fetchOrganizations()
  }, [])

  const handleFiltersChange = ({
    technologies,
    minReliability,
    minProbability,
    years,
  }: {
    technologies: string[]
    minReliability: number
    minProbability: number
    years: number[]
  }) => {
    const filtered = organizations.filter((org) => {
      // Calculate scores
      const currentYear = new Date().getFullYear()
      const recentYears = Object.keys(org.years)
        .map(Number)
        .filter((year) => year >= currentYear - 2)

      const reliabilityScore = (recentYears.length / 3) * 100
      const probability2025 = recentYears.length === 3 ? 90 : recentYears.length === 2 ? 60 : 30

      // Apply filters
      const matchesTechnologies =
        technologies.length === 0 || technologies.some((tech) => org.technologies.includes(tech))
      const matchesReliability = reliabilityScore >= minReliability
      const matchesProbability = probability2025 >= minProbability
      const matchesYears = years.length === 0 || years.some((year) => org.years.hasOwnProperty(year.toString()))
      const matchesSearch =
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.description.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesTechnologies && matchesReliability && matchesProbability && matchesYears && matchesSearch
    })

    setFilteredOrganizations(filtered)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    handleFiltersChange({
      technologies: [],
      minReliability: 0,
      minProbability: 0,
      years: [],
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-destructive p-4">
        <p className="mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search organizations..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm mx-auto"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FilterOptions technologies={allTechnologies} years={allYears} onFiltersChange={handleFiltersChange} />
        </div>
        <div className="lg:col-span-3">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredOrganizations.length} of {organizations.length} organizations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOrganizations.map((org) => (
              <OrganizationCard key={org.name} organization={org} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

