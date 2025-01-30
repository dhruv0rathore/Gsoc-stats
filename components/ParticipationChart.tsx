"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import type { Organization } from "@/types/organization"

interface ParticipationChartProps {
  organization: Organization
}

export default function ParticipationChart({ organization }: ParticipationChartProps) {
  const data = Object.entries(organization.studentSlots).map(([year, slots]) => ({
    year: Number.parseInt(year),
    slots,
  }))

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Student Slots by Year</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="slots" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

