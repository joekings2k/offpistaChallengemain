import React, { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import InsightsCards from "./_components/InsightsCards";
import { FullscreenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function page() {
  async function getInsights() {
    const supabase = await createClient();
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    const userId = user?.id;
    const response = await fetch(
      "https://vlylxdzaruivvyutihez.supabase.co/functions/v1/insghts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.session?.access_token}`,
        },
        body: JSON.stringify({ user_id: userId }),
      }
    );
    const data = await response.json();
    return data;
  }
  const data =  getInsights();

  return (
    <div>
      <Button className="mb-10">
        <Link href={"/protected"}>Back to tasks</Link>
      </Button>
      <Suspense fallback={<StatsCardSkeleton />}>
        <StatsCards data={data} />
      </Suspense>
    </div>
  );
   
}


export async function StatsCards  ({ data }: { data: any }) {
  const datas = await data
  console.log(datas)
  return (
    <div >
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InsightsCards
          title="Total Tasks"
          value={datas.total}
          Icon={FullscreenIcon}
        />
        <InsightsCards
          title="Pending Tasks"
          value={datas.pending}
          Icon={FullscreenIcon}
        />
        <InsightsCards
          title="In Progress Tasks"
          value={datas.inProgress}
          Icon={FullscreenIcon}
        />
        <InsightsCards
          title="Done Tasks"
          value={datas.done}
          Icon={FullscreenIcon}
        />
      </div>
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