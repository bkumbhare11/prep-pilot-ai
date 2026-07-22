function HistoryPagination({ pagination, handleNext, handlePrevious }) {
  return (
    <div className="flex justify-between items-center fixed bottom-0 w-[calc(100%-21rem)] my-4 z-10 ">
      <button
        className="bg-slate-800/80 hover:bg-slate-700 py-3 px-4 text-xs md:text-sm rounded-sm active:scale-95 flex items-center gap-2.5 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={handlePrevious}
        disabled={pagination.currentPage === 1}
      >
        Previous
      </button>
      <p className="bg-slate-900 rounded-xl px-4 py-2">Page 1 of 2</p>
      <button
        className="bg-blue-600 hover:bg-blue-500 py-3 px-4 text-xs md:text-sm rounded-sm active:scale-95 flex items-center gap-2.5 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={handleNext}
        disabled={pagination.currentPage === pagination.totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default HistoryPagination;
