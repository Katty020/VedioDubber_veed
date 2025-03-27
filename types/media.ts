export interface MediaItem {
  id: string
  type: "image" | "video"
  src: string
  position: {
    x: number
    y: number
  }
  size: {
    width: number
    height: number
  }
  startTime: number
  endTime: number
}

