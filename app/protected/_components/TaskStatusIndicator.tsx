import { cn } from "@/lib/utils";
import { TypeTaskStatus } from "@/types/types";

import React from "react";

export default function TaskStatusIndicator({
  status,
}: {
  status: TypeTaskStatus;
}) {
  const indicatorColors: Record<TypeTaskStatus, string> = {
    [TypeTaskStatus.done]: "bg-green-500",
    [TypeTaskStatus.inprogress]: "bg-yellow-500",
    [TypeTaskStatus.pending]: "bg-blue-500",
  };
  return <p className={cn("w-2 h-2 rounded-full", indicatorColors[status])} />;
}

export function TaskStatusLabel({
  status,
}: {
  status: TypeTaskStatus;
}) {
  const labelColors: Record<TypeTaskStatus, string> = {
    [TypeTaskStatus.done]: "text-green-500",
    [TypeTaskStatus.inprogress]: "text-yellow-500",
    [TypeTaskStatus.pending]: "text-blue-500",
  };
  return <span className={cn("lowercase", labelColors[status])}>{status}</span>;
}
