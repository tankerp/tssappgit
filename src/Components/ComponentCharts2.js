import React, { useEffect, useRef, useState } from "react"
import Chartjs from "chart.js"
import { historyOptions } from "../ChartConfigs/ChartConfigs"
import * as Zoom from "chartjs-plugin-zoom"

export const ComponentCharts2 = () => {
  return (
    <div>
      
    </div>
  )
}


const ComponentCharts2 = ({ data, data2 }) => {
  const useStyles = makeStyles(theme => ({
    grid: {
      width: "50%",
      margin: "30px"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      background: theme.palette.success.light
    }
  }))
  const classes = useStyles()
  const [selectedstartDate, setselectedstartDate] = useState(null)
  const [selectedendDate, setselectedendDate] = useState(null)
  const [parav, setParav] = useState("")
  //const [para, setPara] = useState(null)
  console.log(parav)
  const chartRef = useRef()
  //const { sinval, arrval } = data

  //console.log([formatData(arrval)])
  //console.log(data2[0].temperature)

  const handleParamChange = para => {
    setParav(para)

    //console.log(parav)
  }
  const formatData2 = data => {
    //setParav(para)
    //console.log(parav)
    if (parav == 1) {
      return data.map(el => {
        return {
          t: el.datetime,
          y: el.powerval
        }
      })
    } else if (parav == 2) {
      return data.map(el => {
        return {
          t: el.datetime,
          y: el.temperature
        }
      })
    } else if (parav == 3) {
      return data.map(el => {
        return {
          t: el.datetime,
          y: el.voltage
        }
      })
    } else if (parav == 4) {
      return data.map(el => {
        return {
          t: el.datetime,
          y: el.currentval
        }
      })
    } else {
      return data.map(el => {
        return {
          t: el.datetime,
          y: el.currentval
        }
      })
    }
  }
  console.log(formatData2(data2))
  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = new Chartjs(chartRef.current, {
        type: "line",
        data: {
          //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "dc power",
              data: formatData2(data2), //arrval,
              fill: false,
              lineTension: 0.3,
              borderColor: "rgba(255,0,0,0.5)",
              backgroundColor: "rgba(255,0,0,0.5)",
              borderWidth: 3,
              pointRadius: 0.0
            }
          ]
        },
        options: historyOptions
      })
    }
  })
