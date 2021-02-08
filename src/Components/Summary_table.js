import React, { useState, useEffect, useContext } from "react"
import "./Summary_table.css"
import ComponentFinder from "../apis/ComponentFinder"
import { ComponentContext } from "../context/ComponentContext"
import { useHistory } from "react-router-dom"
//import Pagination from "./Pagination"
import ReactPaginate from "react-paginate"

const Summary_table = props => {
  const { sitecomponents, setSiteComponents } = useContext(ComponentContext)
  const [statevalue, setStateValue] = useState()
  const [devvalue, setDevValue] = useState()
  const [stateitems] = useState([
    { label: "Karnataka", value: "KA" },
    { label: "Tamil Nadu", value: "TN" },
    { label: "Gujarat", value: "GJ" }
  ])
  const [developeritems] = useState([
    { label: "Livint", value: "Liv" },
    { label: "TerraStrom Solutions", value: "tss" }
  ])

  //const [loading, setLoading] = useState(false)  To be added later
  /*
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)
  */
  let history = useHistory()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ComponentFinder.get("/")
        console.log(response.data.data)
        setSiteComponents(response.data.data.site)
      } catch (err) {}
    }

    fetchData()
  }, [])

  /*
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentposts = sitecomponents.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = pageNumber => setCurrentPage(pageNumber)
  */

  const [pageNumber, setPageNumber] = useState(0)
  const componentsperPage = 10
  const pagesVisited = pageNumber * componentsperPage
  const pageCount = Math.ceil(sitecomponents.length / componentsperPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const handlecomponentSelect = id => {
    history.push(`/sites/${id}`)
  }

  return (
    <div className="sum_table">
      <div className="sum_table_drop_down">
        <select value={statevalue} onChange={e => setStateValue(e.currentTarget.value)}>
          {stateitems.map(stateitem => (
            <option key={stateitem.label} value={stateitem.value}>
              {stateitem.label}
            </option>
          ))}
        </select>
        <select value={devvalue} onChange={e => setDevValue(e.currentTarget.value)}>
          {developeritems.map(developeritem => (
            <option key={developeritem.label} value={developeritem.value}>
              {developeritem.label}
            </option>
          ))}
        </select>
      </div>
      <table className="table table-hover ">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Project No</th>
            <th scope="col">Pump No</th>
            <th scope="col">Project State</th>
            <th scope="col">Customer ID</th>
            <th scope="col">Developer Name</th>
            <th scope="col">Pump Status</th>
            <th scope="col">Generation Today</th>
            <th scope="col">Generation Till Date</th>
            <th scope="col">Discharge Today</th>
            <th scope="col">Discharge Till Date</th>
          </tr>
        </thead>
        <tbody>
          {sitecomponents &&
            sitecomponents.slice(pagesVisited, pagesVisited + componentsperPage).map(site => {
              return (
                <tr onClick={() => handlecomponentSelect(site.pump_no)} key={site.pump_no}>
                  <td>{site.project_no}</td>
                  <td>{site.pump_no}</td>
                  <td>{site.state_name}</td>
                  <td>{site.customer_id}</td>
                  <td>{site.developer_name}</td>
                  <td>{site.pump_status}</td>
                  <td>{site.generation_today}</td>
                  <td>{site.generation_till_date}</td>
                  <td>{site.discharge_today}</td>
                  <td>{site.discharge_till_date}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <ReactPaginate previousLabel={"Previous"} NextLabel={"Next"} pageCount={pageCount} onPageChange={changePage} containerClassName={"paginationButtons"} previousClassName={"previousButton"} nextLinkClassName={"NextButton"} disabledClassName={"paginationDisabled"} activeClassName={"paginationActive"}></ReactPaginate>
      {/*<Pagination postsPerPage={postsPerPage} totalPosts={sitecomponents.length} paginate={paginate} />*/}
    </div>
  )
}

export default Summary_table

//sitecomponents should be currentPosts for pagination in mapping function
/*
   Original return
   return (
    <div className="sum_table">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Project No</th>
            <th scope="col">Pump No</th>
            <th scope="col">Project State</th>
            <th scope="col">Customer ID</th>
            <th scope="col">Developer Name</th>
            <th scope="col">Pump Status</th>
            <th scope="col">Generation Today</th>
            <th scope="col">Generation Till Date</th>
            <th scope="col">Discharge Today</th>
            <th scope="col">Discharge Till Date</th>
          </tr>
        </thead>
        <tbody>
          {sitecomponents &&
            sitecomponents.map(site => {
              return (
                <tr onClick={() => handlecomponentSelect(site.pump_no)} key={site.pump_no}>
                  <td>{site.project_no}</td>
                  <td>{site.pump_no}</td>
                  <td>{site.state_name}</td>
                  <td>{site.customer_id}</td>
                  <td>{site.developer_name}</td>
                  <td>{site.pump_status}</td>
                  <td>{site.generation_today}</td>
                  <td>{site.generation_till_date}</td>
                  <td>{site.discharge_today}</td>
                  <td>{site.discharge_till_date}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
      {/*<Pagination postsPerPage={postsPerPage} totalPosts={sitecomponents.length} paginate={paginate} />}
      </div>
*/
