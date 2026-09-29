"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { updateFullName, type UpdateFullNameState } from "@/app/(marketing)/account/actions";
import { getDisplayName, getInitials } from "@/lib/account";
import { Button } from "./ui/Button";

const initialState: UpdateFullNameState = { error: null, success: false };

function formatMemberSince(iso: string): string | null {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function AccountPage({
  email,
  fullName,
  createdAt,
}: {
  email: string;
  fullName: string | null;
  createdAt: string;
}) {
  const displayName = getDisplayName(fullName, email);
  const initials = getInitials(displayName);
  const memberSince = formatMemberSince(createdAt);

  const [state, formAction, pending] = useActionState(updateFullName, initialState);
  const [nameDraft, setNameDraft] = useState(fullName ?? "");

  return (
    <main className="min-h-screen bg-cream pb-24 pt-32 sm:pt-36">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-green">My Account</p>
        <h1 className="mt-2 font-serif text-3xl text-forest sm:text-4xl">Account settings</h1>

        <div className="mt-8 rounded-[22px] border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-5">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-forest to-night text-2xl font-semibold uppercase tracking-wide text-gold ring-2 ring-gold/30">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate font-serif text-2xl text-forest">{displayName}</p>
              <p className="mt-1 truncate text-sm text-muted">{email}</p>
              {memberSince && <p className="mt-1 text-xs text-muted">Member since {memberSince}</p>}
            </div>
          </div>

          <form action={formAction} className="mt-8 border-t border-forest/10 pt-6">
            <label
              htmlFor="fullName"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-muted"
            >
              Full name
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={nameDraft}
                onChange={(event) => setNameDraft(event.target.value)}
                placeholder="Your full name"
                maxLength={120}
                className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 font-sans text-sm text-forest outline-none transition-colors placeholder:text-muted/70 focus:border-green/50 focus:ring-4 focus:ring-green/10 sm:max-w-sm"
              />
              <Button type="submit" disabled={pending} className="shrink-0">
                {pending ? "Saving…" : "Save changes"}
              </Button>
            </div>

            {state.error && <p className="mt-3 text-sm text-red-600">{state.error}</p>}
            {state.success && !state.error && <p className="mt-3 text-sm text-green">Saved.</p>}
          </form>
        </div>

        <div className="mt-6 rounded-[22px] border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-xl text-forest">My Trip Requests</h2>
            <Link href="/account/trip-requests" className="text-sm font-semibold text-green hover:text-green-dark">
              View all →
            </Link>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Track custom trip requests and reservations you&apos;ve sent us.
          </p>
        </div>
      </div>
    </main>
  );
}
