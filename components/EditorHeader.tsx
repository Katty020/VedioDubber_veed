"use client"

import { useState } from "react"
import { Group, Text, TextInput, Button, ActionIcon } from "@mantine/core"
import { ArrowLeft, ArrowRight, Lock, Zap, Check } from "lucide-react"

export default function EditorHeader() {
  const [projectName, setProjectName] = useState("VEED")

  return (
    <Group justify="space-between" h="100%" px="md" className="border-b border-gray-200">
      <Group>
        <TextInput
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          variant="unstyled"
          className="font-medium"
          size="md"
        />
        <Group gap="xs" ml="md">
          <Group gap={5}>
            <Lock size={16} className="text-gray-500" />
            <Text size="sm" c="dimmed">
              Log in to save progress
            </Text>
          </Group>
          <ActionIcon variant="subtle" color="gray" radius="xl">
            <ArrowLeft size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray" radius="xl">
            <ArrowRight size={18} />
          </ActionIcon>
        </Group>
      </Group>

      <Group>
        <Text size="sm" c="dimmed">
          Save your project for later —
          <Text component="span" c="blue" className="cursor-pointer">
            sign up
          </Text>{" "}
          or{" "}
          <Text component="span" c="blue" className="cursor-pointer">
            log in
          </Text>
        </Text>
        <Button color="orange" radius="xl" leftSection={<Zap size={16} />}>
          Upgrade
        </Button>
        <Button color="dark" radius="xl" leftSection={<Check size={16} />}>
          Done
        </Button>
      </Group>
    </Group>
  )
}

