import { FormProvider, useForm } from "react-hook-form";
import NavigationBreadCrumbs from "@/components/breadcrumb";
import FormPersonalInfo from "./components/form-personal-info";
import FormRoomContract from "./components/form-room-contract";
import FormButton from "@/components/Form/form-button";
import type { CreateTenantContractSchema } from "@/types/schema/contractSchema";
import { defaultValues, tenantsContractValidationSchema } from "./utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider } from "@heroui/react";
import { useCreateTenantContract } from "@/hooks/useContract";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
import ContractPdf from "./components/contract-pdf";
import { useSelector } from "react-redux";
import { selectContractType, selectEndDate, selectRentalFee, selectRoomNo, selectStartDate, selectTenantId, selectTenantName } from "@/store/features/contract/contractSlice";

const TenantContractPage = () => {
    const navigate = useNavigate();
    const { mutateAsync, isPending, isSuccess } = useCreateTenantContract();
    const tenantName = useSelector(selectTenantName)
    const tenantId = useSelector(selectTenantId)
    const roomNo = useSelector(selectRoomNo)
    const contractType = useSelector(selectContractType)
    const startDate = useSelector(selectStartDate)
    const endDate = useSelector(selectEndDate)
    const rentalFee = useSelector(selectRentalFee)
    const form = useForm<CreateTenantContractSchema>({
        resolver: zodResolver(tenantsContractValidationSchema),
        defaultValues
    });

    console.log('checking state', {
        tenantName,
        tenantId,
        roomNo,
        contractType,
        startDate,
        endDate,
        rentalFee
    })

    useEffect(() => {
        if (!isSuccess) return;

        async function download() {
            const blob = await pdf(
                <ContractPdf
                    tenantName={tenantName!}
                    tenantId={tenantId!}
                    roomNo={String(roomNo!)}
                    contractType={contractType!}
                    startDate={startDate!}
                    endDate={endDate!}
                    rentalFee={rentalFee!}
                />
            ).toBlob();
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `${tenantName}-Contract.pdf`;
            a.click();

            URL.revokeObjectURL(url);
        }

        download();
    }, [contractType, endDate, isSuccess, rentalFee, roomNo, startDate, tenantId, tenantName]);

    const onSubmit = async (values: CreateTenantContractSchema) => {
        await mutateAsync(values);
        form.reset();
    };

    return (
        <div>
            <NavigationBreadCrumbs
                items={[
                    { label: "Contract", href: null },
                    { label: "Tenants' Contract", href: "/tenants" }
                ]}
            />

            <h1 className="font-bold text-2xl my-4">Create New Contract</h1>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormPersonalInfo />
                    <Divider />
                    <FormRoomContract />

                    <div className="flex justify-end gap-2 mt-6">
                        <Button color="default" onPress={() => navigate(-1)}>
                            Cancel
                        </Button>

                        <FormButton type="submit" isLoading={isPending}>
                            Create Contract
                        </FormButton>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default TenantContractPage;
