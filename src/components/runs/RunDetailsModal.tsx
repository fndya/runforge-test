import { X } from "lucide-react";
import type { Run } from "../../types/run";
import { RunStatus } from "./RunStatus";

interface RunDetailsModalProps {
  run: Run;
  onClose: () => void;
}

export function RunDetailsModal({run, onClose}: RunDetailsModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in duration-600"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{run.name}</h2>

          <button onClick={onClose}><X className="hover:animate-pulse"/></button>
        </div>

        <div className="mt-6">
          <p>Repository: <span className="text-slate-400">{run.repository}</span></p>
          <p className="mb-2">Branch: <span className="text-slate-400">{run.branch}</span></p>
          <RunStatus status={run.status}/>
          <h3 className="mt-6 font-semibold">Logs</h3>

          <div className="mt-2 rounded-lg bg-slate-950 p-4 font-mono text-sm text-slate-300">
            {run.logs.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>

          {run.result && (
            <div className="mt-6">
              <h3 className="font-semibold">Result</h3>
              <p>{run.result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
