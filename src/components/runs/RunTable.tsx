import type { Run } from "../../types/run";
import RunTableHeader from "./RunTableHeader";
import RunTableRow from "./RunTableRow";
import { RunStatus } from "./RunStatus";

interface RunTableProps {
  runs: Run[];
  onSelectRun: (run: Run) => void;
}

function RunTable({ runs, onSelectRun }: RunTableProps) {
  return (
    <>
      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {runs.map((run) => (
          <button
            key={run.id}
            onClick={() => onSelectRun(run)}
            className="w-full min-w-0 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-left transition hover:border-slate-600 hover:bg-slate-800/70"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="min-w-0 wrap-break-word font-medium text-slate-200">
                {run.name}
              </p>
              <RunStatus status={run.status} />
            </div>

            <p className="mt-3 break-all text-sm text-slate-400">
              {run.repository}
            </p>

            <div className="mt-4 flex flex-wrap justify-between gap-2 text-xs text-slate-500">
              <span className="break-all">{run.branch}</span>
              <span>
                {new Date(run.createdAt).toLocaleDateString()}
              </span>
            </div>

            {run.duration !== undefined && (
              <p className="mt-2 text-xs text-slate-500">
                Duration: {run.duration}s
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Desktop and tablet table */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50 md:block">
        <table className="w-full min-w-162.5 text-left">
          <RunTableHeader />
          <tbody>
            {runs.map((run) => (
              <RunTableRow
                key={run.id}
                run={run}
                onClick={() => onSelectRun(run)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RunTable;