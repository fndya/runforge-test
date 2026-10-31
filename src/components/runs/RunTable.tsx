import type { Run } from "../../types/run";
import RunTableHeader from "./RunTableHeader";
import RunTableRow from "./RunTableRow";


interface RunTableProps {
    runs: Run[];
    onSelectRun: (run: Run) => void;
}

function RunTable({runs, onSelectRun}: RunTableProps) {
    

    return (
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
            <table className="w-full text-left">
                <RunTableHeader/>
                <tbody>
                {runs.map((run) => (
                    <RunTableRow key={run.id} run={run} onClick={() => onSelectRun(run)}/>
                ))}
            </tbody>
            </table>     
        </div>
    );
}
export default RunTable;