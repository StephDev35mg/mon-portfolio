"use client"
import { useEffect } from "react"

export function VisitTracker() {
  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("visited")) {
      fetch("/api/visitepersonne", { method: "POST" })
      sessionStorage.setItem("visited", "1")
    }
  }, [])
  return null
} 