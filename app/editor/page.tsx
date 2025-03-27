"use client"
import { AppShell } from "@mantine/core"
import EditorHeader from "@/components/EditorHeader"
import Sidebar from "@/components/Sidebar"
import Canvas from "@/components/Canvas"
import Timeline from "@/components/Timeline"
import MediaPanel from "@/components/MediaPanel"
import MediaProperties from "@/components/MediaProperties"
import { MediaProvider, useMediaContext } from "@/context/MediaContext"

function EditorContent() {
  const { selectedMedia } = useMediaContext()

  return (
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
          {selectedMedia && <MediaProperties />}
        </div>
        <Timeline />
      </AppShell.Main>
    </AppShell>
  )
}

export default function EditorPage() {
  return (
    <MediaProvider>
      <EditorContent />
    </MediaProvider>
  )
}

