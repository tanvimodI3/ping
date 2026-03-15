"use client";
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import RoomComponent from "./grpchat";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <RoomComponent />
    </Suspense>
  );
}