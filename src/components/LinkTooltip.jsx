import { Tooltip } from "@mui/material";

export default function LinkTooltip({href, title, text}) {
  return (
    <Tooltip title={title}>
      <a href={href} target="_blank" rel="noopener noreferrer">{text}</a>
    </Tooltip>
  )
}