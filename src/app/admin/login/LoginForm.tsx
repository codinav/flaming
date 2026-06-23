"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";
import { login, type LoginState } from "./actions";

export function LoginForm({ from }: { from?: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  const field =
    "w-full rounded-xl border border-ink/12 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="from" value={from ?? "/admin"} />
      <div>
        <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-ink-700">
          Username
        </label>
        <input id="username" name="username" autoComplete="username" required className={field} />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={field}
        />
      </div>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary w-full justify-center">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" /> Sign in
          </>
        )}
      </button>
    </form>
  );
}
