import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const scenarioSchema = z.object({
  name: z.string().min(3),
  baseAsset: z.string().min(2),
  initialCapital: z.number().positive(),
  riskTolerance: z.string().min(3),
  notes: z.string().optional()
});

export async function GET() {
  const scenarios = await prisma.simulationScenario.findMany({
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ scenarios });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const parseResult = scenarioSchema.safeParse(payload);

  if (!parseResult.success) {
    return NextResponse.json(
      { message: "Dados inválidos", issues: parseResult.error.flatten() },
      { status: 400 }
    );
  }

  const scenario = await prisma.simulationScenario.create({
    data: parseResult.data
  });

  return NextResponse.json({ scenario }, { status: 201 });
}
