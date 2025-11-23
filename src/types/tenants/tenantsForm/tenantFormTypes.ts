import type {
  UseFormRegister,
  Control,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  FieldArrayWithId,
} from "react-hook-form";
import type { TenantFormValues } from "@/schemas/tenants/tenantsFormSchema";

export interface TenantFormSectionProps {
  register: UseFormRegister<TenantFormValues>;
  control: Control<TenantFormValues>;
  errors: FieldErrors<TenantFormValues>;
  fields: FieldArrayWithId<TenantFormValues, "occupants", "id">[];
  append: UseFieldArrayAppend<TenantFormValues, "occupants">;
  remove: UseFieldArrayRemove;
}

export type TenantFormFieldNames =
  | "name"
  | "nrc"
  | "phoneNo"
  | "emergencyNo"
  | "occupants"
  | "email"
  | "roomId"
  | `occupants.${number}`
  | `occupants.${number}.name`
  | `occupants.${number}.nrc`
  | `occupants.${number}.relationshipToTenant`;

export type TenantFormAutoCompleteSelectFieldNames = "roomId";
export type TenantFormSelectFieldNames =
  `occupants.${number}.relationshipToTenant`;

// ဒီမှာ key of TenantFormValues နဲ့လုပ်သင့်။ ဒါပေမယ့် ပြဿနာရှိလို့ လောလောဆယ်ခနထားခဲ့
