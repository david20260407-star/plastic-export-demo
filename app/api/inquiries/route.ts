import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: { product: { select: { id: true, name: true } } },
  });
  return NextResponse.json(inquiries);
}

export async function POST(req: Request) {
  const body = await req.json();
  const inquiry = await prisma.inquiry.create({
    data: {
      name: body.name || "Anonymous",
      email: body.email || "",
      company: body.company || null,
      phone: body.phone || null,
      whatsapp: body.whatsapp || null,
      country: body.country || null,
      city: body.city || null,
      message: body.message || "",
      productId: body.productId || null,
    },
  });
  return NextResponse.json(inquiry);
}
