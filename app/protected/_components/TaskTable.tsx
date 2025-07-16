"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaskType } from "@/types/types";
import {format} from "date-fns"

import TaskStatusIndicator from "./TaskStatusIndicator";
import { Badge } from "@/components/ui/badge";
import TableDropdown from "./TableDropdown";


// function getStatusColor(status: TaskType["status"]) {
//   switch (status) {
//     case TypeTaskStatus.done:
//       return "bg-green-500 text-white";
//     case TypeTaskStatus.inprogress:
//       return "bg-yellow-500 text-white";
//     case TypeTaskStatus.pending:
//       return "bg-blue-500 text-white";
//     default:
//       return "bg-gray-500 text-white";
//   }
// }


export default function TaskTable({ tasks }: { tasks: TaskType[] }) {
  return (
    <div className="rounded-md border mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                <Badge className="inline-flex gap-2 items-center text-white bg-black/40">
                  <TaskStatusIndicator status={task.status} />
                  <p>{task.status}</p>
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {format(new Date(task.inserted_at), "dd/MM/yyyy")}
              </TableCell>

              <TableCell className="text-right">
                <TableDropdown task={task} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
