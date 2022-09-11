import React from 'react'

export default function FullscreenImage (props) {
  return (
    <div className='fullscreenImageHolder'>
      <img
        src={props.source}
        onClick={() => props.exitFullscreen()}
        className='fullscreenImage'
      />
    </div>
  )
}
