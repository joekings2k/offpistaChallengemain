'use server';

import { createClient } from "@/lib/supabase/server";

export async function getInsights() {
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