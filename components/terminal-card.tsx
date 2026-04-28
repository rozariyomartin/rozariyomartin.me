import { BadgeCheck, ShieldCheck } from "lucide-react";

const rows = [
  { prompt: "focus", value: "web security, CTFs, red team fundamentals" },
  { prompt: "tooling", value: "Burp Suite, Nmap, Wireshark, Python" },
  { prompt: "team", value: "cofounder @ Team Hunter" }
];

export function TerminalCard() {
  return (
    <div className="rounded-lg border bg-white shadow-sm shadow-gray-100">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-500" />
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          light terminal
        </div>
      </div>
      <div className="space-y-4 p-5 font-mono text-sm">
        {rows.map((row) => (
          <div key={row.prompt}>
            <span className="text-primary">$</span>{" "}
            <span className="text-foreground">martin.{row.prompt}</span>
            <div className="mt-1 flex items-start gap-2 text-muted-foreground">
              <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{row.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
