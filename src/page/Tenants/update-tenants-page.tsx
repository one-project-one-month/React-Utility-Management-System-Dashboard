import { useForm, useFieldArray } from "react-hook-form";
import {
  tenantFormSchema,
  type TenantFormValues,
} from "@/constants/formSchemas/tenants/tenantsFormSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";
import { mockTenants } from "@/constants/mockData/tenants/mockTenants.ts";
import TenantsFormContainer from "@/components/Tenants/TenentsForm/tenants-form-container.tsx";

export default function UpdateTenantsPage() {
  const { id } = useParams<{ id: string }>();

  const tenantToBeUpdated = mockTenants.find((tenant) => tenant.id === id);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tenantFormSchema),
    defaultValues: {
      name: tenantToBeUpdated?.name ?? "",
      nrc: tenantToBeUpdated?.nrc ?? "",
      occupants: tenantToBeUpdated?.occupants,
      phoneNo: tenantToBeUpdated?.phoneNo ?? "",
      email: tenantToBeUpdated?.email ?? "",
      emergencyNo: tenantToBeUpdated?.emergencyNo ?? "",
      roomId: tenantToBeUpdated?.roomId ?? "",
      contractId: tenantToBeUpdated?.contractId ?? "",
    },
    mode: "onBlur",
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
    <TenantsFormContainer
      tenantId={id}
      action={"update"}
      onSubmit={handleSubmit(onSubmit)}
      tenantsFormSectionProps={tenantsFormSectionProps}
    />
  );
}
