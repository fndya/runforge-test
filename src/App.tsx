import { useEffect, useState } from 'react';
import NavPanel from './components/layout/NavPanel';
import RunTable from './components/runs/RunTable';
import type { Run, RunStatus } from './types/run';
import { getRuns } from './services/runsService';
import { RunDetailsModal } from './components/runs/RunDetailsModal';
import { LoaderCircle, Search, X } from 'lucide-react';

type StatusFilter = 'all' | RunStatus;

type SortOption =
  | 'date-desc'
  | 'date-asc'
  | 'duration-asc'
  | 'duration-desc';

const PAGE_SIZE = 10;

function App() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);
  const [searchQuery, setSearchQuery] = useState(() => {
    return new URLSearchParams(window.location.search).get('search') ?? '';
  });

  const [statusFilter, setStatusFilter] = useState<StatusFilter>(() => {
    const value = new URLSearchParams(window.location.search).get('status');

    const validStatuses: StatusFilter[] = [
      'all',
      'queued',
      'running',
      'succeeded',
      'failed',
    ];

    return validStatuses.includes(value as StatusFilter)
      ? (value as StatusFilter)
      : 'all';
  });

  const [sortOption, setSortOption] = useState<SortOption>(() => {
    const value = new URLSearchParams(window.location.search).get('sort');

    const validSortOptions: SortOption[] = [
      'date-desc',
      'date-asc',
      'duration-asc',
      'duration-desc',
    ];

    return validSortOptions.includes(value as SortOption)
      ? (value as SortOption)
      : 'date-desc';
  });

  

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }

    if (statusFilter !== 'all') {
      params.set('status', statusFilter);
    }

    if (sortOption !== 'date-desc') {
      params.set('sort', sortOption);
    }

    const queryString = params.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.replaceState(null, '', newUrl);
  }, [searchQuery, statusFilter, sortOption]);

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

  const sortedRuns = [...filteredRuns].sort((a, b) => {
    if (sortOption === 'duration-asc' || sortOption === 'duration-desc') {
      // Запуски без известной длительности отправляем в конец
      if (a.duration === undefined) return 1;
      if (b.duration === undefined) return -1;

      return sortOption === 'duration-asc'
        ? a.duration - b.duration
        : b.duration - a.duration;
    }

    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return sortOption === 'date-desc'
      ? dateB - dateA
      : dateA - dateB;
  });

  const totalPages = Math.ceil(sortedRuns.length / PAGE_SIZE);

  const paginatedRuns = sortedRuns.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

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

  function handleRetry() {
    setLoading(true);
    setRetryCount((prev) => prev + 1);
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  function handleStatusChange(value: StatusFilter) {
    setStatusFilter(value);
    setCurrentPage(1);
  }

  function handleClearFilters() {
    setSearchQuery('');
    setStatusFilter('all');
    setCurrentPage(1);
  }

  return (
    <>
      <main
        className="
          min-h-screen w-full min-w-0
          bg-slate-950 p-3 pb-24
          font-semibold text-white
          sm:p-5 sm:pb-24
          lg:grid lg:grid-cols-[260px_minmax(0,1fr)]
          lg:grid-rows-1 lg:gap-5 lg:pb-5
        "
      >
        <NavPanel />

        <section className="min-w-0 w-full rounded-2xl border border-slate-800 p-3 sm:p-5">
          {/* Search and filters */}
          <div
            className="
              sticky top-0 z-30
              -mx-3 -mt-3 mb-5
              flex flex-col gap-4
              border-b border-slate-800
              bg-slate-950/95 px-3 py-4
              backdrop-blur-xl
              sm:-mx-5 sm:-mt-5 sm:px-5
              lg:static lg:mx-0 lg:mt-0
              lg:border-0 lg:bg-transparent
              lg:px-0 lg:py-0 lg:backdrop-blur-none
            "
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search by name or repository..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900/50 p-3 pl-10 pr-10 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-400"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => handleStatusChange(filter.value)}
                  className={`rounded-lg border px-3 py-2 text-sm transition ${
                    statusFilter === filter.value
                      ? 'border-blue-500 bg-blue-500/15 text-blue-400'
                      : 'border-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  {filter.label}
                </button>
              ))}

              <select
                value={sortOption}
                onChange={(event) => {
                  setSortOption(event.target.value as SortOption);
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 outline-none focus:border-blue-400"
                aria-label="Sort runs"
              >
                <option value="date-desc">Newest first</option>
                <option value="date-asc">Oldest first</option>
                <option value="duration-asc">Shortest first</option>
                <option value="duration-desc">Longest first</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-64 flex-col items-center justify-center">
              <LoaderCircle className="animate-spin" />
              <p>Loading runs...</p>
            </div>
          ) : error ? (
            <div className="flex min-h-64 flex-col items-center justify-center">
              <p>Something went wrong.</p>
              <button
                className="m-4 rounded-lg border border-slate-400 px-4 py-2 transition hover:border-slate-600 hover:bg-slate-600"
                onClick={handleRetry}
              >
                Retry
              </button>
            </div>
          ) : filteredRuns.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-slate-300">No runs found</p>
              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filters.
              </p>

              <button
                onClick={handleClearFilters}
                className="mt-4 text-sm text-blue-400 hover:text-blue-300"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div>
              {/* Mobile: show all filtered runs */}
              <div className="md:hidden">
                <RunTable
                  runs={sortedRuns}
                  onSelectRun={setSelectedRun}
                />

                <p className="mt-5 text-sm text-slate-500">
                  {filteredRuns.length}{' '}
                  {filteredRuns.length === 1 ? 'run' : 'runs'} found
                </p>
              </div>

              {/* Tablet and desktop: pagination */}
              <div className="hidden md:block">
                <RunTable
                  runs={paginatedRuns}
                  onSelectRun={setSelectedRun}
                />

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-500">
                    Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                    {Math.min(currentPage * PAGE_SIZE, filteredRuns.length)} of{' '}
                    {filteredRuns.length} runs
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((page) => page - 1)}
                      className="rounded-lg border border-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>

                    <span className="min-w-16 text-center text-sm text-slate-400">
                      {currentPage} / {totalPages}
                    </span>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((page) => page + 1)}
                      className="rounded-lg border border-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
  );
}

export default App;