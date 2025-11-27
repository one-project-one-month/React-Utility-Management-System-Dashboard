import {
   Drawer,
   DrawerContent,
   DrawerHeader,
   DrawerBody,
   DrawerFooter,
   Button,
   useDisclosure,
} from "@heroui/react";
import { Plus } from "lucide-react";
import React from "react";

type DrawerProps = {
   btnText: string;
   title: string;
   children: React.ReactElement<{ onClose?: () => void }>;
   position?: "left" | "right";
   icon?: React.ReactNode;
};

const FormDrawer = ({
   btnText,
   title,
   children,
   position = "right",
   icon,
}: DrawerProps) => {
   const { isOpen, onOpen, onOpenChange } = useDisclosure();

   const motionByPosition = {
      right: {
         enter: { x: 0, opacity: 1 },
         exit: { x: 60, opacity: 0 },
      },
      left: {
         enter: { x: 0, opacity: 1 },
         exit: { x: -60, opacity: 0 },
      },
      top: {
         enter: { y: 0, opacity: 1 },
         exit: { y: -60, opacity: 0 },
      },
      bottom: {
         enter: { y: 0, opacity: 1 },
         exit: { y: 60, opacity: 0 },
      },
   };

   const { enter, exit } = motionByPosition[position] || motionByPosition.right;

   return (
      <>
         <Button color="primary" onPress={onOpen} startContent={icon || <Plus />}>
            {btnText}
         </Button>
         <Drawer
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement={position}
            motionProps={{
               variants: {
                  enter: {
                     ...enter,
                     transition: {
                        type: "tween",
                        ease: [0.16, 1, 0.3, 1],
                        duration: 0.45,
                     },
                  },
                  exit: {
                     ...exit,
                     transition: {
                        type: "tween",
                        ease: [0.7, 0, 0.84, 0],
                        duration: 0.35,
                     },
                  },
               },
            }}
         >
            <DrawerContent>
               {onClose => (
                  <>
                     <DrawerHeader className="flex flex-col gap-1">
                        {title}
                     </DrawerHeader>
                     <DrawerBody>
                        {React.cloneElement(children, { onClose })}
                     </DrawerBody>
                     <DrawerFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                           Close
                        </Button>
                     </DrawerFooter>
                  </>
               )}
            </DrawerContent>
         </Drawer>
      </>
   );
};

export default FormDrawer;
