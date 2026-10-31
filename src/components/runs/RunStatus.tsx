import type { RunStatus } from "../../types/run";

interface RunStatusProps {
  status: RunStatus;
}

const statusStyles = {
  queued: {
    badge: "bg-slate-500/10 text-slate-400",
    dot: "animate-bounce bg-slate-400",
  },
  running: {
    badge: "bg-blue-500/10 text-blue-400",
    dot: "animate-pulse bg-blue-400",
  },
  succeeded: {
    badge: "bg-emerald-500/10 text-emerald-400",
    dot: "bg-emerald-400",
  },
  failed: {
    badge: "bg-red-500/10 text-red-400",
    dot: "bg-red-400",
  },
};

export function RunStatus({ status }: RunStatusProps) {
  const styles = statusStyles[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${styles.badge}`}
    >
      <span className={`size-1.5 rounded-full ${styles.dot}`} />
      {status}
    </span>
  );
}
