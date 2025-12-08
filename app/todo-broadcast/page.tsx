"use client";

import { useEffect, useState } from "react";
import AddTodoBroadcast from "@/components/add-todo-broadcast";
import { createClient } from "@/lib/supabase/client";

export default function TodoBroadcastPage() {
  const [supabase] = useState(() => createClient());
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel("todos", { config: { broadcast: { self: true } } }) // Enable echo
      .on("broadcast", { event: "todo_msg" }, (payload) => {
        setMessages((m) => [...m, payload.payload.text]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Broadcast Todos</h1>

      <AddTodoBroadcast supabase={supabase} />

      <ul className="list-disc list-inside mt-4">
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

