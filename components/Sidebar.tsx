"use client"

import type React from "react"

import { useState } from "react"
import { Stack, Tooltip, UnstyledButton, Text } from "@mantine/core"
import { Search, Settings, Package, Plus, Music, Subtitles, Type, Layers, HelpCircle } from "lucide-react"

interface NavbarLinkProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?(): void
}

function NavbarLink({ icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={`flex flex-col items-center justify-center p-2 w-full h-[70px] transition-colors ${
          active ? "bg-blue-50 text-blue-500" : "text-gray-500 hover:bg-gray-100"
        }`}
      >
        {icon}
        <Text size="xs" mt={5}>
          {label}
        </Text>
      </UnstyledButton>
    </Tooltip>
  )
}

export default function Sidebar() {
  const [active, setActive] = useState("Media")

  const links = [
    { icon: <Search size={20} />, label: "Search" },
    { icon: <Settings size={20} />, label: "Settings" },
    { icon: <Package size={20} />, label: "Brand Kits" },
    { icon: <Plus size={20} />, label: "Media" },
    { icon: <Music size={20} />, label: "Audio" },
    { icon: <Subtitles size={20} />, label: "Subtitles" },
    { icon: <Type size={20} />, label: "Text" },
    { icon: <Layers size={20} />, label: "Elements" },
  ]

  const items = links.map((link) => (
    <NavbarLink
      key={link.label}
      icon={link.icon}
      label={link.label}
      active={link.label === active}
      onClick={() => setActive(link.label)}
    />
  ))

  return (
    <Stack justify="space-between" h="100%" className="border-r border-gray-200">
      <Stack gap={0}>{items}</Stack>
      <NavbarLink icon={<HelpCircle size={20} />} label="Help" />
    </Stack>
  )
}

