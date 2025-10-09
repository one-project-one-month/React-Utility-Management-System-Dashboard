import { Spinner } from "@heroui/react";

export default function LoadingSpinner() {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/40">
      <div className="flex items-center justify-center w-full h-full">
        <Spinner
          classNames={{ label: "text-white mt-4" }}
          label="Logging out..."
          variant="default"
          color="white"
          size="lg"
        />
      </div>
    </div>
  );
}
