import React, { Suspense } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

import { StatsCards } from "./_components/StatsCards";

export default function page() {
  return (
    <div>
      <Button className="mb-10">
        <Link href={"/protected"}>Back to tasks</Link>
      </Button>
      <Suspense fallback={<StatsCardSkeleton />}>
        <StatsCards  />
      </Suspense>
    </div>
  );
   
}




function StatsCardSkeleton() {
  return (
    <div className=" grid gap-3 lg:gap-8 lg:grid-cols-3 min-h-[120px]">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-[120px] rounded-md" />
      ))}
    </div>
  );
}