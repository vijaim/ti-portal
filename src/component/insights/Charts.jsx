/* eslint-disable no-unused-vars */
/* eslint-disable quotes  */
import React, { useState, useEffect } from 'react'
import Chart from 'react-google-charts'

const ChartComponent = ({ period, chartData, chartType }) => {
  const [data, setChartData] = useState(chartData)
  useEffect(() => {
    // console.log('graph data B==>', chartData, data)
    setChartData(chartData)
    return () => {
      setChartData([])
    }
    // console.log('graph data A==>', chartData, data)
  }, [chartData])
  return (
    <Chart
      width={'100%'}
      height={'400px'}
      chartType={chartType}
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        // title: `${period}`,
        // bar: { groupWidth: '95%' },
        tooltip: { isHtml: true, trigger: "visible" },
        colors: ['#3557cc', '#18b7a1']
        // backgroundColor: '#3557cc',
        // Just add this option
        // is3D: true
      }}
      // graph_id={chartType}
      // legend_toggle
    />
  )
}

export default ChartComponent
