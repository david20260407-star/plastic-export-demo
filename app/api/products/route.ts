import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const slug = (body.name || "product")
    .toString()
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "-")
    .slice(0, 20);
  const code = body.code || `${slug}-${Date.now().toString(36).toUpperCase()}`;
  const product = await prisma.product.create({
    data: {
      name: body.name || "Untitled",
      code,
      category: body.category || "General",
      description: body.description || "",
      specs: body.specs || null,
      image: body.image || null,
      priceHint: body.priceHint || null,
      featured: body.featured ?? false,
      baseMaterial: body.baseMaterial || null,
      applicationTags: body.applicationTags || "[]",
    },
  });
  return NextResponse.json(product);
}
