import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { FileSignature, History, Pencil } from "lucide-react";
import type { TenantType } from "@/types/tenants/tenantType.ts";
import { useNavigate } from "react-router";

interface Props {
  tenant: TenantType;
}
export default function TenantDetailsPageHeader({ tenant }: Props) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex items-center">
        <Image
          src={"/images/tenantPic.jpg"}
          className="object-cover w-17 h-17 rounded-full"
        />
        <div className="flex flex-col ml-2">
          <h1 className="text-lg font-semibold">{tenant?.name[0]}</h1>
          <h2 className="text-foreground/50">Tenant ID:{tenant?.id}</h2>
        </div>
      </div>

      <div className="flex gap-5">
        {/*<Button variant="solid" color={"primary"}>*/}
        {/*  See Contract*/}
        {/*</Button>*/}
        {/*<Button variant="ghost" color={"primary"}>*/}
        {/*  New Contract*/}
        {/*</Button>*/}
        <Tooltip content="Edit tenant info" placement="top">
          <Button
            isIconOnly
            variant={"light"}
            color="primary"
            onPress={() => {
              navigate(`/tenants/update/${tenant?.id}`);
            }}
          >
            <Pencil size={25} />
          </Button>
        </Tooltip>
        <Tooltip content="See contract" placement="top">
          <Button
            isIconOnly
            variant={"light"}
            color="primary"
            onPress={() => {
              navigate(`/contracts/details/1`);
            }}
          >
            <FileSignature size={25} />
          </Button>
        </Tooltip>{" "}
        <Tooltip content="See activities history" placement="top">
          <Button
            isIconOnly
            variant={"light"}
            color="primary"
            onPress={() => {
              navigate(`/tenants/${tenant?.id}/activities`);
            }}
          >
            <History size={25} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
