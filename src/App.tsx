import { useEffect, useState } from 'react';
import './App.css'
import NavPanel from './components/layout/NavPanel'
import RunTable from './components/runs/RunTable'
import type { Run } from './types/run';
import { getRuns } from './services/runsService';
import { RunDetailsModal } from './components/runs/RunDetailsModal';
import { LoaderCircle, Search } from 'lucide-react';

function App() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    getRuns()
      .then((data) => {
        setRuns(data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [retryCount]);
  function handleRetry(){
    setRetryCount((prev) => prev + 1);
  }
  return (
    <>
      <main className='bg-slate-950 grid grid-rows-[1fr_100px] gap-5 text-white font-semibold min-h-screen mx-auto p-5 lg:grid-cols-[360px_minmax(0,1fr)] lg:grid-rows-1'>
        <NavPanel/>
        <section className='border border-slate-800 rounded-2xl p-5'>
          <div className='group my-4 relative w-fit'><input type='text' placeholder='Search' className='p-2 placeholder:text-slate-600 placeholder:font-light border border-slate-800 outline-0 rounded-2xl bg-slate-900/50 hover:border-slate-400/50'/><Search className='absolute text-slate-800 top-2 right-2 group-hover:text-slate-400 transition'/></div>
          {loading ? (
            <div className='flex flex-col min-h-full justify-center items-center'>
              <LoaderCircle className='animate-spin'/>
              <p>Loading runs...</p>
            </div>
          ) : error ? (
            <div className='flex flex-col min-h-full justify-center items-center'>
              <p>Something went wrong.</p>
              <button className="m-4 py-2 px-4 border border-slate-400 rounded-lg transition hover:bg-slate-600 hover:border-slate-600" onClick={handleRetry}>Retry</button>
            </div>
          ) : runs.length === 0 ? (
            <p>No runs found.</p>
          ) : (
            <RunTable runs={runs} onSelectRun={setSelectedRun}/>
          )}
        </section>  
      </main>
      {selectedRun && (
        <RunDetailsModal
          run={selectedRun}
          onClose={() => setSelectedRun(null)}
        />
      )}
    </>
  )
}

export default App
