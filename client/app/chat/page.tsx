"use client";
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import ChatComponent from "./chat";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatComponent />
    </Suspense>
  );
}