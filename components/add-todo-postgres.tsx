"use client";

import { useState } from "react";
import { type SupabaseClient } from "@supabase/supabase-js";

export default function AddTodoPostgres({
  supabase,
}: {
  supabase: SupabaseClient;
}) {
  const [text, setText] = useState("");

  const add = async () => {
    if (!text.trim()) return;
    await supabase.from("todos").insert({ text });
    setText("");
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        className="border p-2 rounded w-full"
        placeholder="Write a todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="border px-3 py-2 rounded" onClick={add}>
        Add
      </button>
    </div>
  );
}

