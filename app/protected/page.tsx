import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon, PlusIcon } from "lucide-react";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { getTasks } from "@/actions/task";
import { Button } from "@/components/ui/button";
import CreateTaskDialog from "./_components/CreateTaskDialog";
import TasksCard from "./_components/TaskCard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { waitFor } from "@/lib/helper/waitfor";
import Link from "next/link";

export default async function ProtectedPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const { status } = await searchParams;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  console.log(session);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex justify-between items-center ">
          <h2 className="font-bold text-2xl ">Create tasks</h2>
          <CreateTaskDialog />
        </div>
      </div>

      <div>
        <Button>
          <Link href={"/protected/insights"}> insights</Link>
        </Button>
      </div>
      <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
        <TaskComponent status={status} />
      </Suspense>
    </div>
  );
}

export async function TaskComponent({ status }: { status?: string }) {
  const tasks = await getTasks(status);
  return <TasksCard tasks={tasks} />;
}
