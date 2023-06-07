import { useRef, useState } from "react"



export const Filter = ({ filter, setFilter, setView }) => {

  const filterRef = useRef()
  const viewRef = useRef()

  return (
    <div className="filter-block">
      <details ref={filterRef} className="filter">
        <summary>
            <span>Sort</span>
        </summary>
        <div className="filter-option">
          <p onClick={() => {
            setFilter("asc")
            filterRef.current.removeAttribute("open")
          }}>{'A -> Z'}</p>
          <hr />
          <p onClick={() => {
            setFilter("desc")
            filterRef.current.removeAttribute("open")
          }}>{'Z -> A'}</p>
        </div>
      </details>
      <details ref={viewRef} className="view">
        <summary>
            <span>View</span>
        </summary>
        <div className="view-option">
          <p onClick={() => {
            setView("list")
            viewRef.current.removeAttribute("open")
          }}>List</p>
          <hr />
          <p onClick={() => {
            setView("table")
            viewRef.current.removeAttribute("open")
          }}>Table</p>
        </div>
      </details>
    </div>
  )
}
