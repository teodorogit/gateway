import React from 'react'

interface cardProps{
  api: string
  endpoint: string
}

const Card = ({api, endpoint}:cardProps) => {
  return (
    <details >
      <summary className='hover:cursor-pointer  text-[18px]'>{api} {endpoint}</summary>
     <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
      </details>
  )
}

export default Card