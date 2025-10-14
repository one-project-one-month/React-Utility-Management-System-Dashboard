import { useForm, useFieldArray } from "react-hook-form";

import {
  tenantFormSchema,
  type TenantFormValues,
} from "@/constants/formSchemas/tenants/tenantsFormSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import TenantsFormPageLayout from "@/components/Tenants/TenentsForm/tenants-form-page-layout.tsx";

export default function CreateTenantsPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tenantFormSchema),
    defaultValues: {
      occupants: [{ name: "", nrc: "" }],
      phoneNo: "",
      email: "",
      emergencyNo: "",
      roomId: "",
      contractId: "",
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "occupants",
  });

  const onSubmit = (data: TenantFormValues) => {
    console.log("Form Data:", data);
  };

  const tenantsFormSectionProps = {
    register,
    errors,
    control,
    fields,
    append,
    remove,
  };

  return (
    <TenantsFormPageLayout
      action={"create"}
      onSubmit={handleSubmit(onSubmit)}
      tenantsFormSectionProps={tenantsFormSectionProps}
    />
  );
}
