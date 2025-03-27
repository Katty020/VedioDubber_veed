"use client"

import type React from "react"

import { useState } from "react"
import { Box, Text, Group, Stack, Button, SimpleGrid, UnstyledButton, Title, Paper } from "@mantine/core"
import { Upload, Video, Package, MessageSquare, AudioWaveformIcon as Waveform, ChevronRight } from "lucide-react"
import { useMediaContext } from "@/context/MediaContext"

export default function MediaPanel() {
  const { addMedia, isMediaPanelOpen, toggleMediaPanel } = useMediaContext()
  const [dragOver, setDragOver] = useState(false)

  if (!isMediaPanelOpen) return null

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const url = URL.createObjectURL(file)
      const mediaType = file.type.startsWith("video") ? "video" : "image"
      addMedia({
        id: Date.now().toString(),
        type: mediaType,
        src: url,
        position: { x: 100, y: 100 },
        size: { width: 320, height: 240 },
        startTime: 0,
        endTime: mediaType === "video" ? 10 : 5, // Default 10s for video, 5s for image
      })
      toggleMediaPanel()
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      const url = URL.createObjectURL(file)
      addMedia({
        id: Date.now().toString(),
        type: file.type.startsWith("video") ? "video" : "image",
        src: url,
        position: { x: 100, y: 100 },
        size: { width: 320, height: 240 },
        startTime: 0,
        endTime: file.type.startsWith("video") ? 10 : 5,
      })
      toggleMediaPanel()
    }
  }

  return (
    <Box className="w-[460px] border-r border-gray-200 overflow-y-auto" h="100%">
      <Box p="md">
        <Title order={4} mb="md">
          Add Media
        </Title>

        <Paper
          p="xl"
          radius="md"
          className={`border-2 border-dashed ${dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Stack align="center" gap="xs">
            <Upload size={32} className="text-gray-500" />
            <Text fw={500}>Upload a File</Text>
            <Text size="sm" c="dimmed" ta="center">
              Drag & drop a file
              <br />
              or{" "}
              <Text component="span" c="blue" className="cursor-pointer">
                import from a link
              </Text>
            </Text>
            <input
              type="file"
              id="file-upload"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
              <Button component="span" variant="outline" radius="md" mt="sm">
                Choose File
              </Button>
            </label>
          </Stack>
        </Paper>

        <SimpleGrid cols={2} mt="md" spacing="md">
          <UnstyledButton className="border rounded-md p-3 hover:bg-gray-50">
            <Group>
              <Video className="text-gray-700" size={20} />
              <Text>Record</Text>
            </Group>
          </UnstyledButton>

          <UnstyledButton className="border rounded-md p-3 hover:bg-gray-50">
            <Group justify="space-between">
              <Group>
                <Package className="text-gray-700" size={20} />
                <Text>Brand Kits</Text>
              </Group>
              <Box className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                +
              </Box>
            </Group>
          </UnstyledButton>

          <UnstyledButton className="border rounded-md p-3 hover:bg-gray-50">
            <Group>
              <MessageSquare className="text-gray-700" size={20} />
              <Text>Text To Speech</Text>
              <Box className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                +
              </Box>
            </Group>
          </UnstyledButton>

          <UnstyledButton className="border rounded-md p-3 hover:bg-gray-50">
            <Group justify="space-between">
              <Group>
                <Waveform className="text-gray-700" size={20} />
                <Text>Voice Clone</Text>
              </Group>
              <Box className="bg-blue-500 text-white rounded-full px-1 py-0.5 text-[10px]">NEW</Box>
              <Box className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                +
              </Box>
            </Group>
          </UnstyledButton>
        </SimpleGrid>

        <Group justify="space-between" mt="xl">
          <Text fw={500}>AI Avatars</Text>
          <Group gap={4}>
            <Text size="sm" c="blue">
              View All
            </Text>
            <ChevronRight size={16} className="text-blue-500" />
          </Group>
        </Group>
        <SimpleGrid cols={4} mt="md" spacing="md">
          {[1, 2, 3, 4].map((i) => (
            <Box key={i} className="relative">
              <video
                src={`/placeholder.mp4`}
                controls
                className="w-full aspect-square object-cover rounded-md"
              />
              <Box className="absolute top-1 right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                +
              </Box>
            </Box>
          ))}
        </SimpleGrid>
        
      </Box>
    </Box>
  )
}

