import { useForm, FormProvider } from "react-hook-form";
import { Divider } from "@heroui/react";
import NavigationBreadCrumbs from "@/components/breadcrumb";
import FormContractType from "./components/form-contract-type";
import FormButton from "@/components/Form/form-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { contractTypeValidationSchema } from "./utils/validation";
import ContractTable from "./components/contract-table";
import type { Contracts } from "@/types/contract";
import { useCreateContractType } from "@/hooks/useContract";

export default function ContractTypePage() {
   const { mutateAsync, isPending } = useCreateContractType();
   const form = useForm({
      resolver: zodResolver(contractTypeValidationSchema),
      defaultValues: {
         name: "",
         duration: 0,
         price: 0,
         facilities: [],
      },
   });
   const onSubmit = async (data: Partial<Contracts>) => {
      try {
         await mutateAsync(data);
         form.reset();
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <section className="flex flex-col h-full">
         <NavigationBreadCrumbs
            items={[
               { label: "Contract", href: null },
               { label: "Contract Type", href: "/contract-type" },
            ]}
         />
         <h1 className="sm:text-2xl mt-2">Create New Contract Type</h1>

         <Divider className="my-3" />

         <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <FormContractType />
               <FormButton type="submit" isLoading={isPending}>
                  {isPending ? "Creating" : "Create"}
               </FormButton>
            </form>
         </FormProvider>

         <Divider className="my-3" />

         <h1 className="sm:text-2xl mt-2">Contract Types</h1>
         <br />

         <div className="flex-1 overflow-y-auto pb-14">
            <ContractTable />
         </div>
      </section>
   );
}
