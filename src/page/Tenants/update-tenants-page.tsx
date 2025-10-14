import { useForm, useFieldArray } from "react-hook-form";
import {
  tenantFormSchema,
  type TenantFormValues,
} from "@/constants/formSchemas/tenants/tenantsFormSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router";
import { mockTenants } from "@/constants/mockData/tenants/mockTenants.ts";
import TenantsFormPageLayout from "@/components/Tenants/TenentsForm/tenants-form-page-layout.tsx";

export default function UpdateTenantsPage() {
  const { id } = useParams<{ id: string }>();

  const tenantToBeUpdated = mockTenants.find((tenant) => tenant.id === id);

  const occupants: { name: string; nrc: string }[] = [];
  const occupantNames = tenantToBeUpdated?.name;
  const occupantNRCs = tenantToBeUpdated?.nrc;

  occupantNames?.map((name) => {
    occupants.push({ name, nrc: "" });
  });

  occupantNRCs?.map((nrc, index) => {
    occupants[index].nrc = nrc;
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tenantFormSchema),
    defaultValues: {
      occupants: occupants,
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
    <TenantsFormPageLayout
      tenantId={id}
      action={"update"}
      onSubmit={handleSubmit(onSubmit)}
      tenantsFormSectionProps={tenantsFormSectionProps}
    />
  );
}
