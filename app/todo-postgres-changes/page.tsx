"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AddTodoPostgres from "@/components/add-todo-postgres";

export default function TodoPostgresPage() {
  const supabase = createClient();
  const [todos, setTodos] = useState<any[]>([]);

  // initial load
  useEffect(() => {
    supabase.from("todos").select("*").order("inserted_at").then(({ data }) => {
      if (data) setTodos(data);
    });
  }, [supabase]);

  // realtime from trigger
  useEffect(() => {
    const channel = supabase
      .channel("todos") // must match trigger topic
      .on("broadcast", { event: "INSERT" }, (payload) => {
        setTodos((t) => [...t, payload.payload.new_record]);
      })
      .on("broadcast", { event: "UPDATE" }, (payload) => {
        const newRow = payload.payload.new_record;
        setTodos((t) => t.map((row) => (row.id === newRow.id ? newRow : row)));
      })
      .on("broadcast", { event: "DELETE" }, (payload) => {
        const oldRow = payload.payload.old_record;
        setTodos((t) => t.filter((row) => row.id !== oldRow.id));
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [supabase]);

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Postgres Realtime Todos</h1>

      <AddTodoPostgres />

      <ul className="list-disc list-inside mt-4">
        {todos.map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}

