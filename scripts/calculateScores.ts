import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

async function calculateScores() {
  const { data: organizations, error } = await supabase.from("organizations").select("*")

  if (error) {
    console.error("Error fetching organizations:", error)
    return
  }

  const currentYear = new Date().getFullYear()

  for (const org of organizations) {
    const participationFrequency = org.yearsParticipated.length / (currentYear - 2005 + 1)
    const recentParticipation = org.yearsParticipated.filter((year) => year >= currentYear - 2).length / 3
    const averageSlots =
      Object.values(org.studentSlots).reduce((sum, slots) => sum + slots, 0) / org.yearsParticipated.length

    const reliabilityScore =
      (participationFrequency * 0.4 + recentParticipation * 0.4 + Math.min(averageSlots / 10, 1) * 0.2) * 100

    const probability2025 =
      participationFrequency * 0.3 + recentParticipation * 0.5 + Math.min(averageSlots / 10, 1) * 0.2

    const { error: updateError } = await supabase
      .from("organizations")
      .update({ reliabilityScore, probability2025 })
      .eq("id", org.id)

    if (updateError) {
      console.error(`Error updating scores for ${org.name}:`, updateError)
    }
  }

  console.log("Score calculation completed.")
}

calculateScores()

