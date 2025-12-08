import Link from "next/link";

export function Hero() {
  const dirs = [
    "chat",
    "instruments",
    "notes",
    "protected",
    "upload",
    "todo-broadcast",
    "todo-postgres-changes"
  ];

  return (
    <div className="flex flex-col gap-16 items-center">
      <h1 className="text-2xl font-bold">App Contents</h1>

      <ul className="list-disc list-inside space-y-1">
        {dirs.map((dir) => (
          <li key={dir}>
            <Link href={`/${dir}`} className="underline hover:no-underline">
              {dir}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
