import React from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { TaskType } from '@/types/types';
import { deleteTask } from '@/actions/task';
import EditTaskDialog from './EditTaskDialog';

function TableDropdown({ task }: { task: TaskType }) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <>
      <EditTaskDialog task={task} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            aria-label="Open menu"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => deleteTask(task.id)}
            className="text-red-600"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default TableDropdown