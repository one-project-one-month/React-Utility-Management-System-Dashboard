import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Eye, Pencil } from "lucide-react";
import { useNavigate } from "react-router";

interface Props {
  tenantId: string;
}
export default function ActionsCell({ tenantId }: Props) {
  const navigate = useNavigate();
  const onEditHandler = () => {
    navigate(`/tenants/update/${tenantId}`);
  };
  const onDetailsHandler = () => {
    navigate(`/tenants/${tenantId}/details`);
  };
  return (
    <div className="flex justify-center gap-3">
      <Tooltip content="Edit" placement="top">
        <Button
          isIconOnly
          variant="light"
          color="primary"
          radius="full"
          onPress={onEditHandler}
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
          onPress={onDetailsHandler}
        >
          <Eye size={18} />
        </Button>
      </Tooltip>
    </div>
  );
}
