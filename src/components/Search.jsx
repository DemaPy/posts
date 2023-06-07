



export const Search = ({search, setSearch}) => {
  return (
    <div className="search-box">
        <input className="search" placeholder="Search post..." type="text" value={search} onChange={(ev) => setSearch(ev.target.value)}/>
    </div>
  )
}
