"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,

} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TaskStatusDropDown from "./TaskStatusDropDown";
import { useEffect, useState } from "react";
import {  getTask, updateTask } from "@/actions/task";
import { TaskType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditTaskDialog({ task, isDialogOpen, setIsDialogOpen  }: {
    task: TaskType;
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
  }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("id", task.id);
    formData.set("title", title);
    formData.set("description", description);
    formData.set("status", status);
    await updateTask(formData);
    setTitle("");
    setDescription("");
    setStatus("pending");
  };

 const  {data , isLoading} = useQuery({
    queryKey: ["task", task.id],
    queryFn: async () => {
       await getTask(task.id);
      return task;
    },

    enabled : isDialogOpen,
  });

  useEffect(()=>{
    if(data){
      setTitle(data.title);
      setDescription(data.description);
      setStatus(data.status);
    }
  },[data, isDialogOpen])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Fill in the details for your task.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <Skeleton className="w-full h-[100px]" />
        ) : (
          <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Task Title"
              className="border rounded p-2 w-full"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Task Description"
              className="border rounded p-2 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <TaskStatusDropDown status={status} setStatus={setStatus} />
            </div>

            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
