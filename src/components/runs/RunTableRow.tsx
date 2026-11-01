import type { KeyboardEvent } from 'react';
import type { Run } from '../../types/run';
import { RunStatus } from './RunStatus';

interface RunTableRowProps {
  run: Run;
  onClick: () => void;
}

function RunTableRow({ run, onClick }: RunTableRowProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLTableRowElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  }

  return (
    <tr
      tabIndex={0}
      role="button"
      aria-label={`Open run ${run.name}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="cursor-pointer transition-colors hover:bg-slate-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400"
    >
      <td className="px-5 py-4 font-medium text-slate-200">
        {run.name}
      </td>

      <td className="px-5 py-4 text-sm text-slate-400">
        {run.repository}
      </td>

      <td className="px-5 py-4">
        <RunStatus status={run.status} />
      </td>

      <td className="px-5 py-4 text-sm text-slate-400">
        {run.branch}
      </td>

      <td className="px-5 py-4 text-sm text-slate-500">
        {new Date(run.createdAt).toLocaleDateString()}
      </td>

      <td className="px-5 py-4 text-sm text-slate-500">
        {run.duration !== undefined ? `${run.duration}s` : '—'}
      </td>
    </tr>
  );
}

export default RunTableRow;