import {useNavigate, useParams} from "react-router";
import {ROLE_OPTIONS, TENANT_OPTIONS, userMockData} from "@/constants/userMockData.ts";
import {Controller, type Resolver, useForm} from "react-hook-form";
import {type EditUserFormData, editUserSchema} from "@/types/user.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Switch} from "@heroui/react";
import {FormSelect} from "@/components/Form/form-select.tsx";
import {FormInput} from "@/components/Form/form-input.tsx";
import {breadcrumbs} from "@/constants/breadcrumbs.ts";
import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";

export default function UserEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const user = userMockData.find(u => u.id === id);

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<EditUserFormData>({
        resolver: zodResolver(editUserSchema) as Resolver<EditUserFormData>,
        defaultValues: {
            userName: user?.userName || "",
            email: user?.email || "",
            password: user?.password || "",
            role: user?.role || "staff",
            tenantId: user?.tenantId || null,
            isActive: user?.isActive || true
        }
    });

    if (!user) {
        return (
            <div className="p-8">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold mb-4">User Not Found</h1>
                    <Button onPress={() => navigate('/user-management/users')}>
                        Back to Users
                    </Button>
                </div>
            </div>
        )
    }

    const selectedRole = watch("role");

    const onSubmit = (data: EditUserFormData) => {
        const transformedData = {
            ...data,
            tenantId: data.tenantId == "" ? null : data.tenantId
        }
        console.log("Form submitted", transformedData);
    }

    return (
        <div className={"p-4 space-y-4"}>
            <NavigationBreadCrumbs items={breadcrumbs.userEdit} />
            <div className={"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"}>
                <div>
                    <h1 className={"text-2xl font-medium"}>Edit {user.userName}</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={"space-y-6"}>
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

                    <div className={"grid grid-cols-2 gap-4"}>
                        <Controller
                            name={"tenantId"}
                            control={control}
                            render={({ field }) => (
                                <FormSelect
                                    {...field}
                                    label={"Tenant ID"}
                                    placeholder={"Select tenant ID"}
                                    value={field.value || ""}
                                    options={TENANT_OPTIONS}
                                    onChange={field.onChange}
                                    isInvalid={!!errors.tenantId}
                                    errorMessage={errors.tenantId?.message}
                                    isDisabled={selectedRole !== "tenant"}
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
                                            {value ? 'Active' : 'Inactive'}
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

                    <Button
                        type={"submit"}
                        className={"text-white bg-primary"}
                    >
                        Update
                    </Button>
                </div>
            </form>
        </div>
    )
}