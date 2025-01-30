import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase.from("organizations").select("*").eq("id", params.id).single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: "Organization not found" }, { status: 404 })
  }

  return NextResponse.json(data)
}

