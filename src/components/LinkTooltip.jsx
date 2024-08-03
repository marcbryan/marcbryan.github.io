import { Tooltip } from "@mui/material";
import Link from "@mui/material/Link";

export default function LinkTooltip({href, title, text}) {
  return (
    <Tooltip title={title}>
      <Link href={href} target="_blank" rel="noopener noreferrer">{text}</Link>
    </Tooltip>
  )
}