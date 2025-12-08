"use client";

import { useState } from "react";
import { type SupabaseClient } from "@supabase/supabase-js";

export default function AddTodoBroadcast({
  supabase,
}: {
  supabase: SupabaseClient;
}) {
  const [text, setText] = useState("");

  const send = async () => {
    if (!text.trim()) return;

    await supabase.channel("todos").send({
      type: "broadcast",
      event: "todo_msg",
      payload: { text },
    });

    setText("");
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        className="border p-2 rounded w-full"
        placeholder="Broadcast a todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="border px-3 py-2 rounded" onClick={send}>
        Send
      </button>
    </div>
  );
}
