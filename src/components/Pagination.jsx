

export function Pagination({ page, setPage, loading }) {


  return (
    <div className="pagination">
      <button className={`pagination-item ${page === 0 && "disable"}`} disabled={page === 0 || loading} onClick={() => setPage(prev => prev - 1)}>Prev</button>
      <span className="currentPage">{page}</span>
      <button className={`pagination-item ${page === 11 && "disable"}`} disabled={page === 11 || loading} onClick={() => setPage(prev => prev + 1)}>Next</button>
    </div>
  );
}