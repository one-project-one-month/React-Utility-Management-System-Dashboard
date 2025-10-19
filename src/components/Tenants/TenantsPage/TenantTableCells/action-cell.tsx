import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Eye, Pencil } from "lucide-react";
import type { TenantTableActions } from "@/types/tenants/TenantTableData.ts";

interface Props {
  actions: TenantTableActions;
}
export default function ActionsCell({ actions }: Props) {
  return (
    <div className="flex justify-center gap-3">
      <Tooltip content="Edit" placement="top">
        <Button
          isIconOnly
          variant="light"
          color="primary"
          radius="full"
          onPress={actions.onEdit}
        >
          <Pencil size={18} />
        </Button>
      </Tooltip>

      <Tooltip content="Details" placement="top">
        <Button
          isIconOnly
          variant="light"
          color="default"
          radius="full"
          onPress={actions.onDetails}
        >
          <Eye size={18} />
        </Button>
      </Tooltip>
    </div>
  );
}
