import { Input } from "@heroui/react";
import { Search } from "lucide-react";

export default function UtilityHeader() {
   return (
      <div className="flex items-center justify-between mt-10">
         <Input
            placeholder="Search"
            variant="bordered"
            radius="sm"
            size="lg"
            classNames={{
               inputWrapper: ["border ps-4 w-full"],
            }}
            startContent={<Search size={16} />}
         />
      </div>
   );
}
