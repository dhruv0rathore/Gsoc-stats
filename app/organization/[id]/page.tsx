"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import type { Organization } from "@/types/organization"
import OrganizationDetails from "@/components/OrganizationDetails"
import ParticipationChart from "@/components/ParticipationChart"

export default function OrganizationPage() {
  const { id } = useParams()
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await fetch(`/api/organizations/${id}`)
        const data = await response.json()
        setOrganization(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching organization:", error)
        setLoading(false)
      }
    }

    fetchOrganization()
  }, [id])

  if (loading) {
    return <div className="text-center">Loading organization details...</div>
  }

  if (!organization) {
    return <div className="text-center">Organization not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{organization.name}</h1>
      <OrganizationDetails organization={organization} />
      <ParticipationChart organization={organization} />
    </div>
  )
}

