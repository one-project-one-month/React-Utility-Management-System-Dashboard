import { Button } from "@heroui/button";
import { useNavigate } from "react-router";
interface Props {
  action: "create" | "update";
  isLoading: boolean;
}
export default function FormActionButtons({ action, isLoading }: Props) {
  const navigate = useNavigate();

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
