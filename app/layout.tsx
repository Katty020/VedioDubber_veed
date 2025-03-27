import type React from "react"
import "@mantine/core/styles.css"
import "./globals.css"
import { MantineProvider, createTheme } from "@mantine/core"

const theme = createTheme({
  primaryColor: "blue",
  fontFamily: "Inter, sans-serif",
  defaultRadius: "md",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>VEED.io Clone</title>
        <meta name="description" content="A clone of VEED.io video editor" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
