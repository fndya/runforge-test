import { useEffect, useState } from 'react';
import './App.css'
import NavPanel from './components/layout/NavPanel'
import RunTable from './components/runs/RunTable'
import type { Run, RunStatus } from './types/run';
import { getRuns } from './services/runsService';
import { RunDetailsModal } from './components/runs/RunDetailsModal';
import { LoaderCircle, Search } from 'lucide-react';

function App() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  type StatusFilter = 'all' | RunStatus;

  const statusFilters: { label: string; value: StatusFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Queued', value: 'queued' },
    { label: 'Running', value: 'running' },
    { label: 'Succeeded', value: 'succeeded' },
    { label: 'Failed', value: 'failed' },
  ];

  const filteredRuns = runs.filter((run) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      run.name.toLowerCase().includes(query) ||
      run.repository.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === 'all' || run.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
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
          <div className="my-5 flex flex-col gap-4">
            <div className="relative w-full">
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by name or repository..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900/50 p-3 pr-10 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-400"
              />

              <Search className="absolute right-3 top-3 size-4 text-slate-500" />
            </div>

            <div className="flex flex-wrap gap-2">
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  className={`rounded-lg border px-3 py-2 text-sm transition ${
                    statusFilter === filter.value
                      ? 'border-blue-500 bg-blue-500/15 text-blue-400'
                      : 'border-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
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
          ) :filteredRuns.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-slate-300">No runs found</p>
              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filters.
              </p>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
                className="mt-4 text-sm text-blue-400 hover:text-blue-300"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <RunTable
              runs={filteredRuns}
              onSelectRun={setSelectedRun}
            />
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
