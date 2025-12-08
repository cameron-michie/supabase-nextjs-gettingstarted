"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AddTodoPostgres from "@/components/add-todo-postgres";

export default function TodoPostgresPage() {
  const [supabase] = useState(() => createClient());
  const [todos, setTodos] = useState<any[]>([]);

  // initial load
  useEffect(() => {
    supabase
      .from("todos")
      .select("*")
      .order("inserted_at")
      .then(({ data }) => {
        if (data) setTodos(data);
      });
  }, [supabase]);

  // realtime from postgres_changes
  useEffect(() => {
    const channel = supabase
      .channel("postgres-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "todos" },
        (payload) => {
          setTodos((t) => [...t, payload.new]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "todos" },
        (payload) => {
          setTodos((t) =>
            t.map((row) => (row.id === payload.new.id ? payload.new : row))
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "todos" },
        (payload) => {
          setTodos((t) => t.filter((row) => row.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Postgres Realtime Todos</h1>

      <AddTodoPostgres supabase={supabase} />

      <ul className="list-disc list-inside mt-4">
        {todos.map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}

