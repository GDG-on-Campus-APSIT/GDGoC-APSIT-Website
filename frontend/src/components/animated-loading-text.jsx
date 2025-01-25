"use client"

import { useState, useEffect } from "react"

export function AnimatedLoadingText({ text }) {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? "" : prevDots + "."))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-blue-600 text-lg font-medium mt-4">
      {text}
      <span className="inline-block w-8">{dots}</span>
    </div>
  )
}

