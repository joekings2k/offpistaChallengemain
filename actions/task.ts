"use server";

import { createClient } from "@/lib/supabase/server";
import { TypeTaskStatus } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  const supabase =await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = (formData.get("status") as TypeTaskStatus) || "pending";
  
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  const { error } = await supabase.from("tasks").insert({
    title,
    description,
    status,
    user_id: user?.id,
  });

  if (error) throw error;
  revalidatePath("/protected");
}

export async function updateTask(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = (formData.get("status") as string) || "pending";
  
  if (!id) throw new Error("No id provided");

  const { error } = await supabase.from("tasks").update({
    title,
    description,
    status,
  }).eq("id", id);

  if (error) throw error;
  revalidatePath("/protected");
}


export async function getTasks(filter?: string) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  console.log(user)
  if (userError) throw userError;
  if(!filter || filter === "all"){
    const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user?.id);

    if (error) throw error;

    return tasks;
  }
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user?.id)
    .eq("status", filter);

  if (error) throw error;

  return tasks;
}


export async function getTask(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  const { data: task, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return task;
}


export async function deleteTask (id:string){
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/protected");
}