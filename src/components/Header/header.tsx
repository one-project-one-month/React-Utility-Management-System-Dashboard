import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import {
  Search,
  User,
  Settings,
  LogOutIcon,
  LucideTriangleAlert,
} from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import useLogout from "@/hooks/useLogout";
import LoadingSpinner from "../Auth/loading-spinner";

export default function Header() {
  const { mutate,isPending } = useLogout();

  const { isOpen, onOpen, onClose } = useDisclosure();

  


  const handleLogoutBtn = () => {
    onOpen();
  };

  const handleConfirmLogout = () => {
    mutate();
    onClose();
  };


  return (
    <header className="flex items-center gap-4 px-6 border-b h-14 border-border bg-card">
      <div>
        <h1>NestFlow</h1>
      </div>

      <div className="flex items-center flex-1 gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Dropdown>
          <DropdownTrigger>
            <Avatar
              className="w-8 h-8 cursor-pointer"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Menu" variant="faded">
            <DropdownSection showDivider>
              <DropdownItem key="username" isReadOnly>
                <span className="text-sm font-medium leading-none">
                  Admin User
                </span>
              </DropdownItem>
              <DropdownItem key="email" isReadOnly>
                <span className="text-xs text-muted-foreground">
                  admin@example.com
                </span>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider>
              <DropdownItem key="profile" startContent={<User />}>
                Profile
              </DropdownItem>
              <DropdownItem key="setting" startContent={<Settings />}>
                Setting
              </DropdownItem>
            </DropdownSection>

            <DropdownSection>
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                startContent={<LogOutIcon />}
                onPress={handleLogoutBtn}
              >
                Logout
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
        <Modal isOpen={isOpen} size="sm" onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col items-center justify-center gap-2">
                  <LucideTriangleAlert className="text-danger" size={28} />
                  <span className="text-2xl">Logout?</span>
                </ModalHeader>
                <ModalBody className="text-gray-600">
                  Are you sure you want to log out? You'll need to login in
                  again to access your account.
                </ModalBody>
                <ModalFooter>
                  <div className="flex items-center w-full gap-x-1 ">
                    <Button
                      className="w-full"
                      variant="light"
                      onPress={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="danger"
                      className="w-full"
                      onPress={handleConfirmLogout}
                    >
                      Confirm
                    </Button>
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        {isPending && <LoadingSpinner />}
      </div>
    </header>
  );
}
