import {Controller, type Resolver, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type CreateUserFormData, createUserSchema} from "@/types/user.ts";
import {Button} from "@heroui/react";
import {FormSelect} from "@/components/Form/form-select.tsx";
import {FormInput} from "@/components/Form/form-input.tsx";
import {ROLE_OPTIONS} from "@/constants/userMockData.ts";
import {useCreateUser, useFetchTenants} from "@/hooks/useUsers.ts";
import {useMemo} from "react";
import type {TenantType} from "@/types/tenants/tenantType.ts";

export default function UserCreatePage({ onClose }: { onClose?: () => void }) {
    const { data: tenants, isLoading  } = useFetchTenants();
    const { mutate, isPending } = useCreateUser();

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserSchema) as Resolver<CreateUserFormData>,
        defaultValues: {
            userName: "",
            email: "",
            password: "",
            role: "Tenant",
            tenantId: null,
        }
    });

    const tenantOptions = useMemo(() => {
        if (!tenants) return [];
        return tenants.map((tenant: TenantType) => ({
            key: tenant.id,
            label: tenant.name || tenant.id
        }));
    }, [tenants]);

    const selectedRole = watch("role");

    const onSubmit = (data: CreateUserFormData) => {
        const transformedData = {
            ...data,
            tenantId: data.tenantId == "" ? null : data.tenantId
        }

        mutate(transformedData, {
            onSuccess: () => {
                onClose?.();
            }
        });
    }

    return (
        <form className={"space-y-6"} onSubmit={handleSubmit(onSubmit)}>
            <div className={"grid grid-cols-1 gap-4"}>
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

                <Controller
                    name={"password"}
                    control={control}
                    render={({ field }) => (
                        <FormInput
                            {...field}
                            label={"Password"}
                            placeholder={"Enter password"}
                            value={field.value?.toString() || ""}
                            type={"password"}
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                        />
                    )}
                />

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

                {selectedRole === "Tenant" && (
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
                                isDisabled={isLoading}
                            />
                        )}
                    />
                )}

                <Button
                    type={"submit"}
                    className={"text-white bg-primary"}
                    isLoading={isPending}
                >
                    {isPending ? "Creating" : "Create"}
                </Button>
            </div>
        </form>
    )
}