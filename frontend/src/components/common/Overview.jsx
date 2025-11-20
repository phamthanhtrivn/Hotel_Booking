
import React from 'react'

const Overview = ({overviewData}) => {
  
  return (
    <div className='bg-background p-6 rounded-xl shadow-sm w-full'>
        <h2 className='text-4xl font-semibold mb-4'>
          Overview
        </h2>
        <div className='flex flex-wrap items-center justify-between gap-6'>
          {
            overviewData.map((o, index) => (
              <div key={index} className='grid grid-cols-1 md:grid-cols-2 flex-1 text-center justify-center md:text-left gap-3 '>
                <div className='flex flex-col items-start justify-center'>
                  <p className='text-sm text-foreground/70'>{o.label.split(" ")[0]}</p>
                  <p className='text-sm font-bold text-foreground'>{o.label.split(" ").slice(1).join(" ")}</p>
                </div>
                <p className='text-3xl font-bold text-chart-3/70'>{o.value}</p>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Overview