'use client'
import React from 'react';
import { useState } from 'react'

function UploadFile(props) {

  const [videofile, setvideoFile] = useState()

  const onSubmitvideo = async (e) => {
    e.preventDefault()
    if (!videofile) return

    try {
      const data = new FormData()
      data.set('file', videofile)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())
    } catch (e) {
      // Handle errors here
      console.error(e)
    }
  }

  return (
    <form onSubmit={onSubmitvideo}>
      <input
        accept="video/mp4, video/webm, video/ogg"
        type="file"
        name="file"
        onChange={(e) => setvideoFile(e.target.files?.[0])}
      />
      <input type="submit" value="Upload" />
    </form>
  );
}

export default UploadFile;