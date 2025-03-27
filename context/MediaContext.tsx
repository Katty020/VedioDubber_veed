"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { MediaItem } from "@/types/media"

interface MediaContextType {
  mediaItems: MediaItem[]
  addMedia: (media: MediaItem) => void
  updateMedia: (media: MediaItem) => void
  removeMedia: (id: string) => void
  selectedMedia: MediaItem | null
  setSelectedMedia: (media: MediaItem | null) => void
  currentTime: number
  setCurrentTime: (time: number) => void
  isPlaying: boolean
  togglePlayback: () => void
  duration: number
  isMediaPanelOpen: boolean
  toggleMediaPanel: () => void
}

const MediaContext = createContext<MediaContextType | undefined>(undefined)

export function MediaProvider({ children }: { children: ReactNode }) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMediaPanelOpen, setIsMediaPanelOpen] = useState(true)

  // Calculate the total duration based on the end time of the last media item
  const duration = mediaItems.length > 0 ? Math.max(...mediaItems.map((item) => item.endTime)) : 60 // Default duration

  const addMedia = (media: MediaItem) => {
    setMediaItems((prev) => [...prev, media])
    setSelectedMedia(media)
  }

  const updateMedia = (updatedMedia: MediaItem) => {
    setMediaItems((prev) => prev.map((item) => (item.id === updatedMedia.id ? updatedMedia : item)))

    if (selectedMedia?.id === updatedMedia.id) {
      setSelectedMedia(updatedMedia)
    }
  }

  const removeMedia = (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id))
    if (selectedMedia?.id === id) {
      setSelectedMedia(null)
    }
  }

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev)
  }

  const toggleMediaPanel = () => {
    setIsMediaPanelOpen((prev) => !prev)
  }

  return (
    <MediaContext.Provider
      value={{
        mediaItems,
        addMedia,
        updateMedia,
        removeMedia,
        selectedMedia,
        setSelectedMedia,
        currentTime,
        setCurrentTime,
        isPlaying,
        togglePlayback,
        duration,
        isMediaPanelOpen,
        toggleMediaPanel,
      }}
    >
      {children}
    </MediaContext.Provider>
  )
}

export function useMediaContext() {
  const context = useContext(MediaContext)
  if (context === undefined) {
    throw new Error("useMediaContext must be used within a MediaProvider")
  }
  return context
}

