import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { currentPassword, newPassword } = await req.json();
  
  // 读取当前密码
  const envPath = path.join(process.cwd(), ".env.local");
  let envContent = fs.readFileSync(envPath, "utf-8");
  
  const match = envContent.match(/ADMIN_PASSWORD=(.+)/);
  const storedPassword = match ? match[1] : "admin123";
  
  // 验证当前密码
  if (currentPassword !== storedPassword) {
    return NextResponse.json({ ok: false, error: "Current password incorrect" }, { status: 401 });
  }
  
  // 验证新密码
  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json({ ok: false, error: "New password must be at least 6 characters" }, { status: 400 });
  }
  
  // 更新 .env.local
  if (envContent.includes("ADMIN_PASSWORD=")) {
    envContent = envContent.replace(/ADMIN_PASSWORD=.*/, `ADMIN_PASSWORD=${newPassword}`);
  } else {
    envContent += `\nADMIN_PASSWORD=${newPassword}\n`;
  }
  
  fs.writeFileSync(envPath, envContent);
  
  // 同时更新运行时环境变量
  process.env.ADMIN_PASSWORD = newPassword;
  
  return NextResponse.json({ ok: true });
}
