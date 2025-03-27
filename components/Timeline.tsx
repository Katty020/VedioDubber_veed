"use client"

import { useState, useEffect, useRef } from "react"
import { Box, Group, ActionIcon, Text, Slider } from "@mantine/core"
import { SkipBack, Play, Pause, SkipForward, Scissors, Mic } from "lucide-react"
import { useMediaContext } from "@/context/MediaContext"

export default function Timeline() {
  const { mediaItems, currentTime, setCurrentTime, isPlaying, togglePlayback, duration, selectedMedia, updateMedia } =
    useMediaContext()
  const [timelineWidth, setTimelineWidth] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  // Format time as MM:SS.S
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const tenths = Math.floor((time % 1) * 10)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${tenths}`
  }

  // Animation loop for playback
  const animate = () => {
    if (isPlaying) {
      setCurrentTime((prev) => {
        const newTime = prev + 0.1
        if (newTime >= duration) {
          togglePlayback()
          return 0
        }
        return newTime
      })
      animationRef.current = requestAnimationFrame(animate)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate)
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (timelineRef.current) {
      setTimelineWidth(timelineRef.current.offsetWidth)
    }

    const handleResize = () => {
      if (timelineRef.current) {
        setTimelineWidth(timelineRef.current.offsetWidth)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Box className="border-t border-gray-200 bg-white">
      <Group position="apart" p="xs">
        <Group>
          <ActionIcon variant="subtle" color="gray" onClick={() => setCurrentTime(0)}>
            <SkipBack size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray" onClick={togglePlayback} className="w-8 h-8">
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray">
            <SkipForward size={18} />
          </ActionIcon>
          <Text className="ml-2 text-sm font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
        </Group>

        <Group>
          <ActionIcon variant="subtle" color="gray">
            <Scissors size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray">
            <Mic size={18} />
          </ActionIcon>
        </Group>
      </Group>

      <Box className="relative h-16 border-t border-gray-200" ref={timelineRef}>
        {/* Timeline markers */}
        <div className="absolute top-0 left-0 right-0 h-6 flex text-xs text-gray-500">
          {Array.from({ length: Math.ceil(duration / 10) + 1 }).map((_, i) => (
            <div key={i} className="flex-1 border-r border-gray-200 relative" style={{ minWidth: "50px" }}>
              <span className="absolute left-1">{i * 10}s</span>
            </div>
          ))}
        </div>

        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
          style={{ left: `${(currentTime / duration) * 100}%` }}
        />

        {/* Media items on timeline */}
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className={`absolute h-8 rounded-sm flex items-center justify-center text-xs text-white overflow-hidden
              ${selectedMedia?.id === item.id ? "ring-2 ring-blue-500" : ""}
              ${item.type === "video" ? "bg-blue-500" : "bg-green-500"}`}
            style={{
              left: `${(item.startTime / duration) * 100}%`,
              width: `${((item.endTime - item.startTime) / duration) * 100}%`,
              top: "28px",
            }}
            onClick={() => {
              // Select this media item
              // setSelectedMedia(item);
            }}
          >
            {item.type === "video" ? "Video" : "Image"}
          </div>
        ))}

        {/* Timeline scrubber */}
        <Slider
          value={currentTime}
          onChange={setCurrentTime}
          max={duration}
          step={0.1}
          className="absolute bottom-0 left-0 right-0"
          styles={{
            root: { padding: "0" },
            track: { height: "4px" },
            thumb: { width: "12px", height: "12px", backgroundColor: "red" },
          }}
        />
      </Box>
    </Box>
  )
}

