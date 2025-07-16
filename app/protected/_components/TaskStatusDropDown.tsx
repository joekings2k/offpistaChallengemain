'use client'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";


import React, { useState } from 'react'


function TaskStatusDropDown({ status, setStatus }: { status: string; setStatus: (status: string) => void }) {
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => setStatus("pending")}>
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setStatus("in-progress")}>
          In Progress
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setStatus("done")}>
          Done
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TaskStatusDropDown