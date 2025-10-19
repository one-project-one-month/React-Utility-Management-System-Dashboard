import { Button } from "@heroui/button";
import { useNavigate } from "react-router";
import { useFakeLoading } from "@/hooks/useFakeLoading.ts";

interface Props {
  action: "create" | "update";
}
export default function FormActionButtons({ action }: Props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useFakeLoading();
  return (
    <div className="flex  justify-end gap-5 p-5 pt-2">
      <Button
        onPress={() => {
          navigate("/tenants");
        }}
        color="danger"
        className="px-8 py-3 font-semibold shadow-md min-w-32"
        variant="flat"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        color="primary"
        onPress={() => {
          setIsLoading(true);
        }}
        isLoading={isLoading}
        className="px-8 py-3 font-semibold shadow-md min-w-50"
      >
        {isLoading
          ? action === "create"
            ? "Registering ..."
            : "Updating..."
          : action === "create"
            ? "Register Tenant"
            : "Update Tenant"}
      </Button>
    </div>
  );
}
