"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { validateEmail } from "@/lib/validate-email";

type Status =
  { kind: "idle" } | { kind: "error"; message: string } | { kind: "success"; email: string };

/**
 * UI-only early-access signup. Validates client-side and shows a success state.
 * Nothing is stored or sent.
 */
export function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const inputId = useId();
  const errorId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (status.kind === "success") successRef.current?.focus();
  }, [status.kind]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = validateEmail(email);
    if (!result.ok) {
      setStatus({ kind: "error", message: result.error });
      inputRef.current?.focus();
      return;
    }

    // TODO(backend): send `result.value` to the waitlist endpoint here, e.g.
    //   await fetch("/api/early-access", { method: "POST", body: JSON.stringify({ email: result.value }) })
    // and handle network/duplicate errors before showing success.
    // Until then, nothing is stored or transmitted.
    setStatus({ kind: "success", email: result.value });
  }

  if (status.kind === "success") {
    return (
      <div className="border border-accent bg-accent/10 p-5" role="status">
        <p ref={successRef} tabIndex={-1} className="font-display text-xl font-bold outline-none">
          You&apos;re on the list.
        </p>
        <p className="mt-2 text-muted">
          We&apos;ll write to <span className="font-mono text-ink">{status.email}</span> when
          there&apos;s a build to try.
        </p>
        <button
          type="button"
          onClick={() => {
            setEmail("");
            setStatus({ kind: "idle" });
          }}
          className="mt-4 font-mono text-xs uppercase tracking-wider text-accent-text underline underline-offset-4"
        >
          Use a different email
        </button>
      </div>
    );
  }

  const hasError = status.kind === "error";

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Early access signup">
      <label htmlFor={inputId} className="eyebrow block">
        Email address
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          ref={inputRef}
          id={inputId}
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="you@university.edu"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (hasError) setStatus({ kind: "idle" });
          }}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={`h-12 min-w-0 flex-1 rounded-sm border bg-bg px-4 text-base text-ink placeholder:text-muted/80 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            hasError ? "border-danger" : "border-line-strong/70"
          }`}
        />
        <button type="submit" className="btn-primary h-12 px-6 text-base">
          Get early access
        </button>
      </div>
      <p id={errorId} className="mt-2 min-h-[1.25rem] text-sm text-danger" aria-live="polite">
        {hasError ? status.message : ""}
      </p>
    </form>
  );
}
