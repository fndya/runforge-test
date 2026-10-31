import type { Run } from "../../types/run";
import { RunStatus } from "./RunStatus";


interface RunTableRowProps {
  run: Run;
  onClick: () => void;
}

function RunTableRow({run, onClick}: RunTableRowProps) {
  return (
      <tr onClick={onClick} className="transition-colors hover:bg-slate-800/50">
        <td className="px-5 py-4 font-medium text-slate-200">
          {run.name}
        </td>

        <td className="px-5 py-4 text-sm text-slate-400">
          {run.repository}
        </td>

        <td className="px-5 py-4">
            <RunStatus status={run.status}/>
        </td>

        <td className="px-5 py-4 text-sm text-slate-400">
          {run.branch}
        </td>

        <td className="px-5 py-4 text-sm text-slate-500">
          {new Date(run.createdAt).toLocaleDateString()}
        </td>
      </tr>
  );
}
export default RunTableRow;
