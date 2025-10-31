"use client";

import React from "react";

export default function Error({ error, reset }) {
  // Render a helpful error UI when routes throw during rendering
  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-2">Something went wrong</h1>
      <pre className="whitespace-pre-wrap text-red-600">{String(error?.message)}</pre>
      <div className="mt-4">
        <button
          onClick={() => reset && reset()}
          className="px-3 py-1 border rounded bg-gray-100"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
