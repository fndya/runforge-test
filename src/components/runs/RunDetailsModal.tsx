import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Run } from '../../types/run';
import { RunStatus } from './RunStatus';

interface RunDetailsModalProps {
  run: Run;
  onClose: () => void;
}

export function RunDetailsModal({ run, onClose }: RunDetailsModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm animate-fade-in sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="run-details-title"
        className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-4 text-white sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4">
          <h2
            id="run-details-title"
            className="wrap-break-word text-xl font-bold"
          >
            {run.name}
          </h2>

          <button
            onClick={onClose}
            aria-label="Close run details"
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X />
          </button>
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <p>
            Repository:{' '}
            <span className="text-slate-400">{run.repository}</span>
          </p>

          <p>
            Branch:{' '}
            <span className="text-slate-400">{run.branch}</span>
          </p>

          <p>
            Created:{' '}
            <span className="text-slate-400">
              {new Date(run.createdAt).toLocaleString()}
            </span>
          </p>

          <p>
            Duration:{' '}
            <span className="text-slate-400">
              {run.duration !== undefined ? `${run.duration}s` : '—'}
            </span>
          </p>

          <RunStatus status={run.status} />
        </div>

        <h3 className="mt-6 font-semibold">Logs</h3>

        <div className="mt-2 max-h-72 overflow-y-auto rounded-lg bg-slate-950 p-4 font-mono text-sm text-slate-300">
          {run.logs.length > 0 ? (
            run.logs.map((log, index) => (
              <p key={index} className="wrap-break-word">
                {log}
              </p>
            ))
          ) : (
            <p className="text-slate-500">No logs available.</p>
          )}
        </div>

        {run.result && (
          <div className="mt-6">
            <h3 className="font-semibold">Result</h3>
            <p className="mt-2 wrap-break-word text-sm text-slate-400">
              {run.result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}