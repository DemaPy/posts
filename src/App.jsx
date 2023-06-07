import { useMemo, useState } from "react"
import { Filter } from "./components/Filter"
import { Pagination } from "./components/Pagination"
import { Container } from "./components/Container"
import { Posts } from "./components/Posts"
import { Navbar } from "./components/Navbar"
import { Search } from "./components/Search"
import "./App.css"

function App() {

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const [view, setView] = useState("list")
  const [type, setFilter] = useState("")
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    message: "",
  });


  const PaginationMemo = useMemo(() => {
    return <Pagination loading={status.loading} page={page} setPage={setPage} />
  }, [page, status.loading])


  const FilterMemo = useMemo(() => {
    return <Filter filter={type} setFilter={setFilter} setView={setView} ></Filter>
  }, [type])

  const SearchMemo = useMemo(() => {
    return <Search search={search}  setSearch={setSearch}/>
  }, [search])

  return (
    <>
      <Navbar />
      <Container>
        {SearchMemo}
        {FilterMemo}
        <Posts search={search} view={view} status={status} setStatus={setStatus} page={page} type={type} />
        {PaginationMemo}
      </Container>
    </>
  )
}

export default App
