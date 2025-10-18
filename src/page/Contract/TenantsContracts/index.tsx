import { FormProvider, useForm } from "react-hook-form"
import NavigationBreadCrumbs from "@/components/breadcrumb"
import FormPersonalInfo from "./components/form-personal-info"
import FormRoomContract from "./components/form-room-contract"
import FormButton from "@/components/Form/form-button"
import type { CreateTenantContractSchema } from "@/types/schema/contractSchema"
import { defaultValues, tenantsContractValidationSchema } from "./utils/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider } from "@heroui/react"

const TenantContractPage = () => {
    const form = useForm<CreateTenantContractSchema>({
        resolver: zodResolver(tenantsContractValidationSchema),
        defaultValues: defaultValues
    })

    const onSubmit = (values: CreateTenantContractSchema) => {
        console.log('form submitted', values)
    }

    return (
        <div>
            <NavigationBreadCrumbs
                items={[
                    { label: "Contract", href: null },
                    { label: "Tenants' Contract", href: "/tenants" },
                ]}
            />
            <h1 className="font-bold text-2xl my-4">Create New Contract</h1>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormPersonalInfo />
                    <Divider />
                    <FormRoomContract />
                    <div className="flex justify-end gap-2 mt-6">
                        <Button color="default">Cancel</Button>
                        <FormButton type="submit">
                            Create Contract
                        </FormButton>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default TenantContractPage