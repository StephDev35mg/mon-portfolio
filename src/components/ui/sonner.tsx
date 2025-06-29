"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      
      toastOptions={{
        classNames: {
          toast:
            "group pointer-events-auto relative flex w-full max-w-sm items-center space-x-4 overflow-hidden rounded-xl border bg-purple-600 p-4 pr-6 text-sm shadow-lg transition-all duration-300",
          success:
            " bg-purple-600 ",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
