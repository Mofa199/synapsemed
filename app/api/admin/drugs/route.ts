import { type NextRequest, NextResponse } from "next/server"

// Mock database - in real app, this would be a proper database
const drugs: any[] = [
  { id: 1, name: "Aspirin", class: "NSAIDs", category: "Pain Relief", createdAt: new Date().toISOString() },
  { id: 2, name: "Metformin", class: "Antidiabetic", category: "Diabetes", createdAt: new Date().toISOString() },
  {
    id: 3,
    name: "Lisinopril",
    class: "ACE Inhibitor",
    category: "Cardiovascular",
    createdAt: new Date().toISOString(),
  },
]

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const drugData = {
      id: drugs.length + 1,
      name: data.name,
      genericName: data.genericName,
      brandNames: data.brandNames.split(",").map((b: string) => b.trim()),
      class: data.class,
      category: data.category,
      description: data.description,
      mechanism: data.mechanism,
      indications: data.indications.split("\n").filter((i: string) => i.trim()),
      dosage: {
        adult: data.dosageAdult,
        pediatric: data.dosagePediatric,
        elderly: data.dosageElderly,
      },
      administration: {
        route: data.administrationRoute,
        timing: data.administrationTiming,
        instructions: data.administrationInstructions,
      },
      pharmacokinetics: {
        absorption: data.absorption,
        distribution: data.distribution,
        metabolism: data.metabolism,
        elimination: data.elimination,
        halfLife: data.halfLife,
      },
      contraindications: data.contraindications.split("\n").filter((c: string) => c.trim()),
      warnings: data.warnings.split("\n").filter((w: string) => w.trim()),
      sideEffects: {
        common: data.sideEffectsCommon.split(",").map((s: string) => s.trim()),
        serious: data.sideEffectsSerious.split(",").map((s: string) => s.trim()),
        rare: data.sideEffectsRare.split(",").map((s: string) => s.trim()),
      },
      interactions: data.interactions
        .split("\n")
        .filter((i: string) => i.trim())
        .map((interaction: string) => {
          const parts = interaction.split(" - ")
          return {
            drug: parts[0] || "",
            effect: parts[1] || "",
            severity: parts[2] || "Moderate",
          }
        }),
      monitoring: data.monitoring.split(",").map((m: string) => m.trim()),
      storage: data.storage,
      pregnancy: data.pregnancy,
      createdAt: new Date().toISOString(),
    }

    drugs.push(drugData)

    return NextResponse.json({ success: true, drug: drugData })
  } catch (error) {
    console.error("Drugs API Error:", error)
    return NextResponse.json({ error: "Failed to add drug" }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json({ drugs })
  } catch (error) {
    console.error("Drugs API Error:", error)
    return NextResponse.json({ error: "Failed to get drugs" }, { status: 500 })
  }
}
