"use client"
import React from 'react'
import ApexChart from 'react-apexcharts'
import { useSelector } from 'react-redux'

import { AppState } from '@/store'

type Props = {}
export default function({}: Props) {

  const cpuUsage = useSelector((state: AppState) => state.statusState.cpuUsage);
  const memoryUsage = useSelector((state: AppState) => state.statusState.memoryUsage);
  
  return (
    <div className='h-full w-[40%] flex flex-row items-center justify-evenly'>
      <ApexChart
        type='radialBar'
        series={[cpuUsage]}
        height='100%'
        width='100%'
        options={{
          plotOptions: {
            radialBar: {
              hollow: {
                size: '70%',
              },
              dataLabels: {
                name: {
                  show: true,
                },
                value: {
                  show: true,
                  color: '#c3c3c3',
                },
              },
            },
          },
          labels: ['CPU'],
          theme: {
            monochrome: {
              enabled: true,
              color: '#ff0000',
              shadeTo: 'dark',
              shadeIntensity: 0.65,
            },
          },
        }}
      />
      <ApexChart
        type='radialBar'
        series={[memoryUsage]}
        height='100%'
        width='100%'
        options={{
          plotOptions: {
            radialBar: {
              hollow: {
                size: '70%',
              },
              dataLabels: {
                name: {
                  show: true,
                },
                value: {
                  show: true,
                  color: '#c3c3c3',
                },
              },
            },
          },
          labels: ['RAM'],
          theme: {
            monochrome: {
              enabled: true,
              color: '#ff0000',
              shadeTo: 'dark',
              shadeIntensity: 0.65,
            },
          },
        }}
      />
    </div>
  )
}
