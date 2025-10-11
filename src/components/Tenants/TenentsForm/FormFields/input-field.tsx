import { Input } from "@heroui/input";
import type { UseFormRegister } from "react-hook-form";
import type { TenantFormValues } from "@/constants/formSchemas/tenants/tenantsFormSchema.ts";
import clsx from "clsx";
import type { TenantFormFieldNames } from "@/types/tenants/tenantsForm/tenantFormTypes.ts";

interface Props {
  isForRegisterSection?: boolean;
  label: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  errorMessage: string;
  isInvalid: boolean;
  register: UseFormRegister<TenantFormValues>;
  nameForRegister: TenantFormFieldNames;
}
export default function InputField({
  isForRegisterSection,
  label,
  placeholder,
  type,
  errorMessage,
  isInvalid,
  register,
  nameForRegister,
}: Props) {
  return (
    <div className={clsx(isForRegisterSection && "md:col-span-5")}>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <Input
        size="sm"
        variant={"bordered"}
        type={type}
        placeholder={placeholder}
        errorMessage={errorMessage}
        isInvalid={isInvalid}
        {...register(nameForRegister)}
        classNames={{
          input: "bg-white",
        }}
      />
    </div>
  );
}
