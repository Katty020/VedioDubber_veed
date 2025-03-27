"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useDragControls } from "framer-motion"
import { useMediaContext } from "@/context/MediaContext"
import type { MediaItem } from "@/types/media"

interface MediaElementProps {
  item: MediaItem
  zoom: number
}

export default function MediaElement({ item, zoom }: MediaElementProps) {
  const { updateMedia, setSelectedMedia, selectedMedia } = useMediaContext()
  const dragControls = useDragControls()
  const elementRef = useRef<HTMLDivElement>(null)
  const [resizing, setResizing] = useState(false)
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 })
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 })
  const isSelected = selectedMedia?.id === item.id

  // Handle video element
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (item.type === "video" && videoRef.current) {
      if (isSelected) {
        videoRef.current.currentTime = 0
      }
    }
  }, [isSelected, item.type])

  const startDrag = (event: React.PointerEvent) => {
    dragControls.start(event)
    setSelectedMedia(item)
  }

  const handleDragEnd = (info: any) => {
    updateMedia({
      ...item,
      position: {
        x: info.point.x / zoom,
        y: info.point.y / zoom,
      },
    })
  }

  const startResize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setResizing(true)
    setResizeStart({ x: e.clientX, y: e.clientY })
    setInitialSize({ width: item.size.width, height: item.size.height })
    setSelectedMedia(item)
  }

  const handleResize = (e: MouseEvent) => {
    if (!resizing) return

    const deltaX = (e.clientX - resizeStart.x) / zoom
    const deltaY = (e.clientY - resizeStart.y) / zoom

    const newWidth = Math.max(50, initialSize.width + deltaX)
    const newHeight = Math.max(50, initialSize.height + deltaY)

    updateMedia({
      ...item,
      size: { width: newWidth, height: newHeight },
    })
  }

  const stopResize = () => {
    setResizing(false)
  }

  useEffect(() => {
    if (resizing) {
      window.addEventListener("mousemove", handleResize)
      window.addEventListener("mouseup", stopResize)
    }

    return () => {
      window.removeEventListener("mousemove", handleResize)
      window.removeEventListener("mouseup", stopResize)
    }
  }, [resizing])

  return (
    <motion.div
      ref={elementRef}
      drag
      dragControls={dragControls}
      onPointerDown={startDrag}
      onDragEnd={handleDragEnd}
      dragMomentum={false}
      initial={false}
      style={{
        x: item.position.x * zoom,
        y: item.position.y * zoom,
        width: item.size.width * zoom,
        height: item.size.height * zoom,
        zIndex: isSelected ? 10 : 1,
      }}
      className={`absolute cursor-move ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      onClick={() => setSelectedMedia(item)}
    >
      {item.type === "image" ? (
        <img src={item.src || "/placeholder.svg"} alt="Media" className="w-full h-full object-cover" />
      ) : (
        <video ref={videoRef} src={item.src} className="w-full h-full object-cover" muted loop />
      )}

      {isSelected && (
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 cursor-se-resize" onMouseDown={startResize} />
      )}
    </motion.div>
  )
}

