"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { FileText, X } from "lucide-react";
import { mockBillings } from "@/constants/mockData/billing/mockBillings.ts";

import { mockTenants } from "@/constants/mockData/tenants/mockTenants.ts";
import { mockRooms } from "@/constants/mockData/tenants/mockRooms.ts";
import { mockContracts } from "@/constants/mockData/tenants/mockContracts.ts";
import DetailsModalHeader from "@/components/Billings/BillingDetails/details-modal-header.tsx";
import DetailsModalBody from "@/components/Billings/BillingDetails/details-model-body.tsx";

interface Props {
  billingId: string;
}

export default function BillingDetailsModal({ billingId }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const billing = mockBillings.find((b) => b.id === billingId);

  const tenant = mockTenants.find((t) => t.roomId === billing?.roomId);
  const room = mockRooms.find((r) => r.id === billing?.roomId);
  const contract = mockContracts.find((c) => c.tenantId === tenant?.id);

  if (!billing || !tenant || !room || !contract) return null;

  return (
    <>
      <Tooltip content="See Billing Details" placement="top">
        <Button
          isIconOnly
          variant="light"
          color="primary"
          radius="full"
          onPress={onOpen}
        >
          <FileText size={18} />
        </Button>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        scrollBehavior="inside"
        classNames={{
          base: "dark:border-1.5  dark:border-default-100 ",
          backdrop: "dark:bg-black/85 ",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-3 border-b border-divider mt-3 pb-3">
                <DetailsModalHeader
                  tenant={tenant}
                  room={room}
                  contract={contract}
                />
              </ModalHeader>

              <ModalBody className="mt-2 space-y-3">
                <DetailsModalBody billing={billing} />
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  startContent={<X size={16} />}
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
