import { ExternalLink } from "lucide-react";
import { Button } from "@heroui/react";

import { Tooltip } from "@heroui/tooltip";
import { type JSX } from "react";
import { useNavigate } from "react-router";

interface Props {
  icon: JSX.Element;
  data: string;
  tooltipContent: string;
  color: "success" | "default" | "primary" | "secondary" | "warning" | "danger";
  href: string;
}
export default function ModalHeaderItem({
  icon,
  data,
  tooltipContent,
  href,
  color,
}: Props) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2">
      {icon}
      <p className="font-semibold">{data}</p>
      <Tooltip content={tooltipContent} placement="top">
        <Button
          isIconOnly
          variant="light"
          color={color}
          radius="full"
          size="sm"
          onPress={() => {
            navigate(href);
          }}
        >
          <ExternalLink size={16} />
        </Button>
      </Tooltip>
    </div>
  );
}
