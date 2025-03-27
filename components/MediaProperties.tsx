"use client"
import { Box, Text, Group, NumberInput, Stack, Divider } from "@mantine/core"
import { useMediaContext } from "@/context/MediaContext"

export default function MediaProperties() {
  const { selectedMedia, updateMedia } = useMediaContext()

  if (!selectedMedia) return null

  return (
    <Box className="w-[300px] border-l border-gray-200 p-4 overflow-y-auto">
      <Text fw={500} mb="md">
        Media Properties
      </Text>

      <Stack spacing="md" spacing="16px">
        <Box>
          <Text size="sm" fw={500} mb="xs">
            Position
          </Text>
          <Group grow>
            <NumberInput
              label="X"
              value={Math.round(selectedMedia.position.x)}
              onChange={(val) =>
                updateMedia({
                  ...selectedMedia,
                  position: { ...selectedMedia.position, x: Number(val) || 0 },
                })
              }
              min={0}
              step={10}
            />
            <NumberInput
              label="Y"
              value={Math.round(selectedMedia.position.y)}
              onChange={(val) =>
                updateMedia({
                  ...selectedMedia,
                  position: { ...selectedMedia.position, y: Number(val) || 0 },
                })
              }
              min={0}
              step={10}
            />
          </Group>
        </Box>

        <Box>
          <Text size="sm" fw={500} mb="xs">
            Size
          </Text>
          <Group grow>
            <NumberInput
              label="Width"
              value={Math.round(selectedMedia.size.width)}
              onChange={(val) =>
                updateMedia({
                  ...selectedMedia,
                  size: { ...selectedMedia.size, width: Number(val) || 100 },
                })
              }
              min={50}
              step={10}
            />
            <NumberInput
              label="Height"
              value={Math.round(selectedMedia.size.height)}
              onChange={(val) =>
                updateMedia({
                  ...selectedMedia,
                  size: { ...selectedMedia.size, height: Number(val) || 100 },
                })
              }
              min={50}
              step={10}
            />
          </Group>
        </Box>

        <Divider />

        <Box>
          <Text size="sm" fw={500} mb="xs">
            Timing
          </Text>
          <Group grow>
            <NumberInput
              label="Start Time (s)"
              value={selectedMedia.startTime}
              onChange={(val) =>
                updateMedia({
                  ...selectedMedia,
                  startTime: Number(val) || 0,
                })
              }
              min={0}
              step={0.1}
              stepPrecision={1}
            />
            <NumberInput
              label="End Time (s)"
              value={selectedMedia.endTime}
              onChange={(val) =>
                updateMedia({
                  ...selectedMedia,
                  endTime: Number(val) || 5,
                })
              }
              min={selectedMedia.startTime + 0.1}
              step={0.1}
              precision={1}
            />
          </Group>
        </Box>
      </Stack>
    </Box>
  )
}

