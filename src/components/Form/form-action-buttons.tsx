import FormButton from "./form-button";
import FormCancelButton from "./form-cancel-button";
interface Props {
  action: "create" | "update";
  isLoading: boolean;
}
export default function FormActionButtons({ action, isLoading }: Props) {
  return (
    <div className="flex  justify-end gap-5 p-5 pt-2">
      <FormCancelButton />
      <FormButton type="submit" isLoading={isLoading}>
        {isLoading
          ? action === "create"
            ? "Registering ..."
            : "Updating..."
          : action === "create"
            ? "Register"
            : "Update"}
      </FormButton>
    </div>
  );
}
