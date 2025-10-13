import { useForm, FormProvider } from "react-hook-form"
import { Form, Divider } from "@heroui/react";
import NavigationBreadCrumbs from "@/components/breadcrumb"
import FormContractType from "./components/form-contract-type";
import FormButton from "@/components/Form/form-button"
import { zodResolver } from "@hookform/resolvers/zod";
import { contractTypeValidationSchema } from "./utils/validation";


type Contracts = {
    name: string;
    duration: string;
    price: string;
    facilities?: string[];
};

export default function ContractTypePage() {
    const form = useForm<Contracts>({
        resolver: zodResolver(contractTypeValidationSchema),
        defaultValues: { name: "", duration: "", price: "" }
    });

    const onSubmit = (data: Contracts) => {
        console.log("Success", data);
    }


    return (
        <section  >
            <NavigationBreadCrumbs
                items={[
                    { label: "Contract", href: null },
                    { label: "Contract Type", href: "/contract-type" },
                ]}
            />
            <h1 className="sm:text-2xl mt-2">Create New Contract Type</h1>

            <Divider style={{ marginBlock: "1rem" }} />

            <FormProvider {...form}>
                <div className="">

                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormContractType />
                        <br />
                        <FormButton type="submit">Create</FormButton>
                    </form>

                </div>
            </FormProvider>
        </section >
    )
}
