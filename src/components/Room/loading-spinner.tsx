import { Spinner } from "@heroui/react";

export function LoadingSpinner() {
   return (
      <div className={"text-center"}>
         <Spinner
            classNames={{ label: "text-primary mt-4" }}
            label="Loading data, please wait..."
            variant="default"
            color="primary"
            size="lg"
         />
      </div>
   );
}
