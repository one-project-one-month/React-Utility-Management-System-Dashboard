import { Card, CardBody } from "@heroui/card";

interface Props {
  children: React.ReactNode;
}
export default function TenantsFormContainer({ children }: Props) {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar   border border-divider/70  rounded-xl">
      <Card className="shadow-lg rounded-xl border-0">
        <CardBody className="p-6">{children}</CardBody>
      </Card>
    </div>
  );
}
