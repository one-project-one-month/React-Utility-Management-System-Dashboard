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
import { Eye, X } from "lucide-react";

import DetailsModalHeader from "@/components/Billings/BillingDetails/details-modal-header.tsx";
import DetailsModalBody from "@/components/Billings/BillingDetails/details-model-body.tsx";
import type { Billing } from "@/types/billing/billingType.ts";

interface Props {
  billing: Billing;
}

export default function BillingDetailsModal({ billing }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log("billing", billing);
  return (
    <>
      <Tooltip content={"See  Details"} placement="top">
        <Button
          isIconOnly
          variant="light"
          color="primary"
          radius="full"
          onPress={onOpen}
        >
          <Eye size={18} />
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
              <ModalHeader>
                <DetailsModalHeader room={billing.room} />
              </ModalHeader>

              <ModalBody>
                <DetailsModalBody billing={billing} />
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant={"light"}
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
