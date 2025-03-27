"use client"

import { useRouter } from "next/navigation"
import { AppShell } from "@mantine/core"
import EditorHeader from "@/components/EditorHeader"
import Sidebar from "@/components/Sidebar"
import Canvas from "@/components/Canvas"
import Timeline from "@/components/Timeline"
import MediaPanel from "@/components/MediaPanel"
import { MediaProvider } from "@/context/MediaContext"

export default function EditorPage() {
  const router = useRouter()

  return (
    <MediaProvider>
      <AppShell header={{ height: 60 }} navbar={{ width: 80, breakpoint: "sm" }} padding={0}>
        <AppShell.Header>
          <EditorHeader />
        </AppShell.Header>
        <AppShell.Navbar>
          <Sidebar />
        </AppShell.Navbar>
        <AppShell.Main className="flex flex-col h-screen">
          <div className="flex flex-1 overflow-hidden">
            <MediaPanel />
            <Canvas />
          </div>
          <Timeline />
        </AppShell.Main>
      </AppShell>
    </MediaProvider>
  )
}

