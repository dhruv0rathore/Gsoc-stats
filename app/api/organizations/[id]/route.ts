import { NextResponse } from "next/server";

const API_BASE_URL = "https://api.gsocorganizations.dev";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`${API_BASE_URL}/organizations.json`);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Find the specific organization by ID
    const organization = data.find(org => org.id === params.id);

    if (!organization) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }

    return NextResponse.json(organization);
  } catch (error) {
    console.error("Error fetching from GSoC API:", error);
    return NextResponse.json(
      { error: "Failed to fetch organizations", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}


