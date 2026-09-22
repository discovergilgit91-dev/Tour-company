"use client";

import { useId, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { EyeIcon, EyeOffIcon } from "./icons";

export const FIELD_CLASS =
  "w-full rounded-xl border border-forest/15 bg-white px-4 py-3 pl-11 font-sans text-sm text-forest outline-none transition-colors placeholder:text-muted/70 focus:border-green/50 focus:ring-4 focus:ring-green/10";

type AuthFieldProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  icon: React.ReactNode;
};

export function AuthField({ label, icon, id, className = "", ...props }: AuthFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div>
      <label htmlFor={fieldId} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-forest/35">{icon}</span>
        <input id={fieldId} className={`${FIELD_CLASS} ${className}`} {...props} />
      </div>
    </div>
  );
}

type PasswordFieldProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  /** Renders a 4-bar strength meter below the field, driven by the current value. */
  showStrength?: boolean;
};

function passwordStrength(value: string) {
  if (!value) return 0;
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score;
}

const STRENGTH_META = [
  { label: "", color: "bg-forest/10" },
  { label: "Weak", color: "bg-red-400" },
  { label: "Fair", color: "bg-gold" },
  { label: "Good", color: "bg-green" },
  { label: "Strong", color: "bg-green-dark" },
];

export function PasswordField({
  label,
  showStrength = false,
  id,
  value,
  onChange,
  className = "",
  ...props
}: PasswordFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const [visible, setVisible] = useState(false);

  const strValue = typeof value === "string" ? value : "";
  const score = showStrength ? passwordStrength(strValue) : 0;
  const meta = STRENGTH_META[score];

  return (
    <div>
      <label htmlFor={fieldId} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-forest/35">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="4.5" y="10.5" width="15" height="10" rx="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 10.5V8a4 4 0 1 1 8 0v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="12" cy="15" r="1.4" fill="currentColor" />
          </svg>
        </span>
        <input
          id={fieldId}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={`${FIELD_CLASS} pr-11 ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-forest/35 transition-colors hover:text-forest"
        >
          {visible ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
        </button>
      </div>

      {showStrength && (
        <div className="mt-2 flex items-center gap-2">
          <div className="flex flex-1 gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i <= score ? meta.color : "bg-forest/10"
                }`}
              />
            ))}
          </div>
          <span className="w-10 shrink-0 text-right text-[10px] font-semibold uppercase tracking-[0.06em] text-muted">
            {meta.label}
          </span>
        </div>
      )}
    </div>
  );
}
