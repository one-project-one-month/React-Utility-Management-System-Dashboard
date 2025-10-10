import type {
  UseFormRegister,
  Control,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  FieldArrayWithId,
} from "react-hook-form";
import type { TenantFormValues } from "@/constants/formSchemas/tenants/tenantsFormSchema";

export interface TenantFormSectionProps {
  register: UseFormRegister<TenantFormValues>;
  control: Control<TenantFormValues>;
  errors: FieldErrors<TenantFormValues>;
  fields: FieldArrayWithId<TenantFormValues, "occupants", "id">[];
  append: UseFieldArrayAppend<TenantFormValues, "occupants">;
  remove: UseFieldArrayRemove;
}

export type TenantFormFieldNames =
  | "phoneNo"
  | "emergencyNo"
  | "occupants"
  | "email"
  | "roomId"
  | "contractId"
  | `occupants.${number}`
  | `occupants.${number}.name`
  | `occupants.${number}.nrc`;

export type TenantFormSelectFieldNames = "roomId" | "contractId";

// ဒီမှာ key of TenantFormValues နဲ့လုပ်သင့်။ ဒါပေမယ့် ပြဿနာရှိလို့ လောလောဆယ်ခနထားခဲ့
