/* eslint-disable no-unused-vars */
/* eslint-disable quotes  */
import React, { useState, useEffect } from 'react'
import Chart from 'react-google-charts'

const ChartComponent = ({ period, chartData, chartType }) => {
  const [data, setChartData] = useState(chartData)
  useEffect(() => {
    setChartData(chartData)
    return () => {
      setChartData([])
    }
  }, [chartData])
  return (
    <Chart
      width={'100%'}
      height={'400px'}
      chartType={'LineChart'}
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        backgroundColor: '#fff',
        vAxis: {
          minValue: 0
        },
        annotations: {
          alwaysOutside: true
        }
      }}
    />
  )
}

export default ChartComponent
