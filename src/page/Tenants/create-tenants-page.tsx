import { useForm, useFieldArray } from "react-hook-form";

import {
  tenantFormSchema,
  type TenantFormValues,
} from "@/constants/formSchemas/tenants/tenantsFormSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import TenantsFormContainer from "@/components/Tenants/TenentsForm/tenants-form-container.tsx";
import { useTenants } from "@/hooks/tenants/useTenant.ts";
import { useEffect } from "react";

export default function CreateTenantsPage() {
  const { createTenantMutation } = useTenants();

  const { isPending, isSuccess } = createTenantMutation;
  const {
    reset,
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
      // contractId: "",
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "occupants",
  });

  const onSubmit = (data: TenantFormValues) => {
    createTenantMutation.mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Tenant created successfully!");
      reset();
    }
  }, [isSuccess]);

  const tenantsFormSectionProps = {
    register,
    errors,
    control,
    fields,
    append,
    remove,
  };

  return (
    <TenantsFormContainer
      action={"create"}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isPending}
      tenantsFormSectionProps={tenantsFormSectionProps}
    />
  );
}
