import React, { useState, useEffect } from "react"
import ComponentFinder from "../apis/ComponentFinder"
import Header from "./../Components/Header"
import { CSVDownloader } from "react-papaparse"
import { useForm } from "react-hook-form"
//https://preview.npmjs.com/package/react-papaparse
const Reports = () => {
  const [reportData, setReportData] = useState([])
  const [errreportData, setErrReportData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const result_rep = await ComponentFinder.get(`/reports`)

      //console.log(results.data.data.pt)
      setReportData(result_rep.data.data)
      console.log(result_rep.data.data)
      setIsLoading(false)
    }
    fetchData()
    /*
    const fetcherrData = async () => {
      //setIsLoading(true)
      const err_rep = await ComponentFinder.get(`/errorlist`)
      console.log(err_rep.data.data)
      setErrReportData(err_rep.data.data.site)

      //setIsLoading(false)
    }
    fetcherrData()*/
  }, [])

  useEffect(() => {
    const fetcherrData = async () => {
      //setIsLoading(true)
      const err_rep = await ComponentFinder.get(`/errorlist`)
      console.log(err_rep.data.data)
      setErrReportData(err_rep.data.data.site)

      //setIsLoading(false)
    }
    fetcherrData()
  }, [])

  /*
  function CharacterDropDown() {
    return (
      <select>
        <option value="Temperature">Temperature</option>
        <option value="Current">Current</option>
        <option value="Voltage">Voltage</option>
        <option value="dc power">dc power</option>
        <option value="status">status</option>
      </select>
    )
  }*/

  //https://www.carlrippon.com/drop-down-data-binding-with-react-hooks/
  function CharacterDropDown() {
    const [value, setValue] = React.useState()
    const [items] = useState([
      { label: "Temperature", value: "Temp" },
      { label: "Current", value: "curr" },
      { label: "Voltage", value: "volt" },
      { label: "DC Power", value: "dcpower" },
      { label: "Status", value: "status" }
    ])

    return (
      <select value={value} onChange={e => setValue(e.currentTarget.value)}>
        {items.map(item => (
          <option key={item.label} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    )
  }

  /*
  function CharacterDropDown() {
    const [reportcolData, setReportcolData] = useState([])

    useEffect(() => {
      const fetchcolumnData = async () => {
        setIsLoading(true)
        const result_col = await ComponentFinder.get(`/reportscol`)
        //console.log(results.data.data.pt)
        setReportcolData(result_col.data.data[0].column_name)
        console.log(result_col.data.data[0].column_name)
        setIsLoading(false)
      }
      fetchcolumnData()
    }, [])
    return (
      <select>
        {reportcolData &&
          reportcolData.map(item => (
            <option key={item.label} value={item.value}>
              {item.label}
            </option>
          ))}
      </select>
    )
  }
*/
  const renderDate = () => {
    if (isLoading) {
      return <div>Loading......</div>
    }
    return (
      <>
        <div className="navbar_header">
          <Header></Header>
        </div>
        <div className="Container-summ">
          <div className="form-group form-check">
            <input name="acceptTerms" type="checkbox" />
            <label for="acceptTerms" className="form-check-label">
              All parameters
            </label>
            <input name="acceptTerms" type="checkbox" />
            <label for="acceptTerms" className="form-check-label">
              AC power
            </label>
            <input name="acceptTerms" type="checkbox" />
            <label for="acceptTerms" className="form-check-label">
              Voltage
            </label>
            <input name="acceptTerms" type="checkbox" />
            <label for="acceptTerms" className="form-check-label">
              Current
            </label>
          </div>
          <CSVDownloader data={reportData} type="button" filename={"Summary"} bom={true}>
            Download Summary
          </CSVDownloader>
        </div>
        <div className="Container-err">
          <CSVDownloader data={errreportData} type="button" filename={"Errors"} bom={true}>
            Download Error
          </CSVDownloader>
        </div>

        <div className="Container">
          <CharacterDropDown />
        </div>
      </>
    )
  }
  return renderDate()
}

export default Reports
