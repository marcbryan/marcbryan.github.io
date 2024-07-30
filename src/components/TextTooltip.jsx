import { Tooltip } from "@mui/material";

export default function TextTooltip({title, text, bold}) {
  return (
    <Tooltip title={title} style={{ cursor: "default", fontWeight:(bold ? "bold" : undefined) }}>
      <span>{text}</span>
    </Tooltip>
  )
}