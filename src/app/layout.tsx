import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OPEN 无界社交",
  description: "开放、自由、连接世界的社交平台",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
