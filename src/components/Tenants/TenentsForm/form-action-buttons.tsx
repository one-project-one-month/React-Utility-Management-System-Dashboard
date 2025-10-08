import { Button } from "@heroui/button";
import { useNavigate } from "react-router";

interface Props {
  action: "create" | "update";
}
export default function FormActionButtons({ action }: Props) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-5 pt-2">
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
        className="px-8 py-3 font-semibold shadow-md min-w-32"
      >
        {action === "create" ? "Register Tenant " : "Update Tenant"}
      </Button>
    </div>
  );
}
