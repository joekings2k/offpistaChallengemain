"use client";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { TaskType } from "@/types/types";
import TaskTable from "./TaskTable";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/actions/task";
import { Skeleton } from "@/components/ui/skeleton";

export default function TasksCard({ tasks,selectedFilter }: { tasks: TaskType[],selectedFilter?:string }) {  //selectedFilter?:string is optional parameter for the filter select box. If not provided, it will be set to "all" by default.

  console.log(selectedFilter)
  const router = useRouter();
  const searchParams = useSearchParams();
  

  

  return (
    <Card className="w-full mt-5">
      <CardHeader className="rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background">
        <CardTitle className="text-base">Tasks</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Here’s a list of all your tasks.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 overflow-x-auto">
        <Select
          value={searchParams.get("status") ?? "all"}
          onValueChange={(value) => {
            const params = new URLSearchParams(searchParams);
            params.set("status", value);
            router.push(`?${params.toString()}`);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>

        <TaskTable tasks={tasks} />
      </CardContent>
    </Card>
  );
}
