"use client"

import { useState, useRef } from "react"
import { Box, Group, ActionIcon, Select, Text } from "@mantine/core"
import { ZoomIn, ZoomOut, Maximize } from "lucide-react"
import { useMediaContext } from "@/context/MediaContext"
import MediaElement from "./MediaElement"

export default function Canvas() {
  const { mediaItems, currentTime, isPlaying } = useMediaContext()
  const [canvasSize, setCanvasSize] = useState({ width: 1280, height: 720 })
  const [zoom, setZoom] = useState(1)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Filter media items that should be visible at current time
  const visibleMedia = mediaItems.filter((item) => currentTime >= item.startTime && currentTime <= item.endTime)

  return (
    <Box className="flex-1 bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
      <Box
        className="relative bg-black"
        style={{
          width: canvasSize.width * zoom,
          height: canvasSize.height * zoom,
          transition: "width 0.3s, height 0.3s",
        }}
        ref={canvasRef}
      >
        {visibleMedia.map((item) => (
          <MediaElement key={item.id} item={item} zoom={zoom} />
        ))}
      </Box>

      <Group position="apart" className="w-full p-2 bg-white border-t border-gray-200">
        <Group>
          <Select
            value={`${canvasSize.width}:${canvasSize.height}`}
            onChange={(value) => {
              if (value === "1280:720") setCanvasSize({ width: 1280, height: 720 })
              else if (value === "1920:1080") setCanvasSize({ width: 1920, height: 1080 })
              else if (value === "720:1280") setCanvasSize({ width: 720, height: 1280 })
            }}
            data={[
              { value: "1280:720", label: "Landscape (16:9)" },
              { value: "1920:1080", label: "Landscape HD (16:9)" },
              { value: "720:1280", label: "Portrait (9:16)" },
            ]}
            rightSection={
              <Text size="xs" c="dimmed">
                (16:9)
              </Text>
            }
          />
        </Group>

        <Group>
          <ActionIcon variant="subtle" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
            <ZoomOut size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle" onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}>
            <ZoomIn size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle">
            <Maximize size={18} />
          </ActionIcon>
        </Group>
      </Group>
    </Box>
  )
}

