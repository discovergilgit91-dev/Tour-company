"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type UpdateFullNameState = {
  error: string | null;
  success: boolean;
};

export async function updateFullName(
  _prevState: UpdateFullNameState,
  formData: FormData
): Promise<UpdateFullNameState> {
  const fullName = String(formData.get("fullName") ?? "").trim();

  if (fullName.length > 120) {
    return { error: "That name is a bit too long — 120 characters max.", success: false };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "You've been signed out — please sign in again.", success: false };
    }

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName || null })
      .eq("id", user.id);

    if (error) {
      return { error: "We couldn't save that just now — please try again.", success: false };
    }
  } catch {
    return { error: "We couldn't reach the server. Please check your connection and try again.", success: false };
  }

  revalidatePath("/account");
  return { error: null, success: true };
}
