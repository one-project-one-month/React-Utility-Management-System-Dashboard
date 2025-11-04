import { useNavigate, useParams } from "react-router";
import { ROLE_OPTIONS } from "@/constants/userMockData.ts";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { type EditUserFormData, editUserSchema } from "@/types/user.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Switch } from "@heroui/react";
import { FormSelect } from "@/components/Form/form-select.tsx";
import { FormInput } from "@/components/Form/form-input.tsx";
import { breadcrumbs } from "@/constants/breadcrumbs.ts";
import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import {
  useEditUser,
  useFetchTenants,
  useFetchUser,
} from "@/hooks/useUsers.ts";
import { LoadingSpinner } from "@/components/Room/loading-spinner.tsx";
import { useEffect, useMemo } from "react";
import type { Tenant } from "@/types/tenants/tenantType.ts";

export default function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: tenants, isLoading: isTenantLoading } = useFetchTenants();
  const { data: user, isLoading } = useFetchUser(id!);
  console.log(user);

  const { mutate, isPending } = useEditUser();

  const tenantOptions = useMemo(() => {
    if (!tenants) return [];
    return tenants.map((tenant: Tenant) => ({
      key: tenant.id,
      label: tenant.name || tenant.id,
    }));
  }, [tenants]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema) as Resolver<EditUserFormData>,
    defaultValues: {
      userName: "",
      email: "",
      role: "Tenant",
      tenantId: null,
      isActive: true,
    },
  });

  const selectedRole = watch("role");

  useEffect(() => {
    if (user) {
      reset({
        userName: user.userName,
        email: user.email,
        password: user.password,
        role: user.role || "Tenant",
        tenantId: user.tenantId,
        isActive: user.isActive,
      });
    }
  }, [user, reset]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">User Not Found</h1>
          <Button onPress={() => navigate("/user-management/users")}>
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = (data: EditUserFormData) => {
    const transformedData = {
      ...data,
      tenantId: data.tenantId == "" ? null : data.tenantId,
    };
    console.log(transformedData);
    mutate({
      id: id!,
      formData: data,
    });
  };

  return (
    <div className={"p-2 space-y-4"}>
      <NavigationBreadCrumbs items={breadcrumbs.userEdit} />

      <form onSubmit={handleSubmit(onSubmit)} className={"space-y-6"}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          User Information
        </h3>
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
          <Controller
            name={"userName"}
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                label={"Username"}
                placeholder={"Enter username"}
                value={field.value?.toString() || ""}
                isInvalid={!!errors.userName}
                errorMessage={errors.userName?.message}
              />
            )}
          />

          <Controller
            name={"email"}
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                label={"Email"}
                placeholder={"Enter email"}
                value={field.value?.toString() || ""}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
              />
            )}
          />
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
          <Controller
            name={"role"}
            control={control}
            render={({ field }) => (
              <FormSelect
                label={"Role"}
                placeholder={"Select role"}
                options={ROLE_OPTIONS}
                value={field.value?.toString() || ""}
                onChange={(value) => {
                  field.onChange(value);

                  if (value !== "tenant") {
                    setValue("tenantId", null);
                  }
                }}
                isInvalid={!!errors.role}
                errorMessage={errors.role?.message}
              />
            )}
          />

          <Controller
            name={"tenantId"}
            control={control}
            render={({ field }) => (
              <FormSelect
                {...field}
                label={"Tenant"}
                placeholder={"Select tenant"}
                value={field.value || ""}
                options={tenantOptions}
                onChange={field.onChange}
                isInvalid={!!errors.tenantId}
                errorMessage={errors.tenantId?.message}
                isDisabled={selectedRole !== "Tenant" || isTenantLoading}
              />
            )}
          />

          <Controller
            name="isActive"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div className="flex flex-col gap-2">
                <label className="text-sm text-foreground-600">Status</label>
                <div className="flex items-center justify-between px-3 py-2 border-[0.5px] rounded-medium bg-white dark:bg-transparent border-default-200 hover:border-default-400 transition-colors">
                  <span className="text-sm text-default-600">
                    {value ? "Active" : "Inactive"}
                  </span>
                  <Switch
                    isSelected={value}
                    onValueChange={onChange}
                    color="primary"
                    size="sm"
                  />
                </div>
              </div>
            )}
          />
        </div>

        <div className={"flex justify-end gap-2"}>
          <Button
            type={"button"}
            variant={"bordered"}
            className={"border-[0.5px]"}
            onPress={() => navigate("/user-management/users")}
          >
            Cancel
          </Button>
          <Button
            type={"submit"}
            className={"text-white bg-primary"}
            isLoading={isPending}
          >
            {isPending ? "Editing" : "Edit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
