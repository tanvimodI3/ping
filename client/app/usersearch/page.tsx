"use client";
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import SearchComponent from "./search_comp";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading users...</div>}>
      <SearchComponent />
    </Suspense>
  );
}