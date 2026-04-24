import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const data: any = {};
  if (body.name !== undefined) data.name = body.name;
  if (body.category !== undefined) data.category = body.category;
  if (body.description !== undefined) data.description = body.description;
  if (body.specs !== undefined) data.specs = body.specs;
  if (body.image !== undefined) data.image = body.image;
  if (body.priceHint !== undefined) data.priceHint = body.priceHint;
  if (body.featured !== undefined) data.featured = body.featured;

  const updated = await prisma.product.update({ where: { id }, data });
  return NextResponse.json(updated);
}
