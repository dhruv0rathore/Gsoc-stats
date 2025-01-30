import axios from "axios"
import cheerio from "cheerio"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

async function scrapeGsocData() {
  const baseUrl = "https://summerofcode.withgoogle.com/archive"
  const years = Array.from({ length: 20 }, (_, i) => 2005 + i)

  for (const year of years) {
    console.log(`Scraping data for ${year}...`)
    const url = `${baseUrl}/${year}/organizations`
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    const organizations = $(".organization-card")
      .map((_, el) => {
        const name = $(el).find(".organization-card__name").text().trim()
        const technologies = $(el)
          .find(".organization-card__tech")
          .text()
          .trim()
          .split(",")
          .map((t) => t.trim())
        const topics = $(el)
          .find(".organization-card__topics")
          .text()
          .trim()
          .split(",")
          .map((t) => t.trim())

        return {
          name,
          technologies,
          topics,
          year,
        }
      })
      .get()

    for (const org of organizations) {
      const { data, error } = await supabase.from("organizations").upsert(
        {
          name: org.name,
          yearsParticipated: [org.year],
          programmingLanguages: org.technologies,
          projectCategories: org.topics,
        },
        { onConflict: "name" },
      )

      if (error) {
        console.error(`Error inserting data for ${org.name}:`, error)
      }
    }
  }

  console.log("Data scraping completed.")
}

scrapeGsocData()

