import {
  Input, Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Avatar,
} from '@heroui/react'
import { Search, User, Settings, LogOutIcon } from 'lucide-react'
import ThemeToggle from '@/components/theme-toggle'
import Logo from '@/assets/logo.png'

export default function Header() {
  return (
    <header className="flex h-14 items-center gap-4 bg-card p-6">
      <div>
        <img 
          src={Logo}
          width={40}
          height={40}
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 items-center gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Dropdown>
          <DropdownTrigger>
            <Avatar
              className="h-8 w-8 cursor-pointer"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Menu" variant="faded">
            <DropdownSection showDivider>
              <DropdownItem key='username' isReadOnly>
                <span className="text-sm font-medium leading-none">Admin User</span>
              </DropdownItem>
              <DropdownItem key='email' isReadOnly>
                <span className="text-xs text-muted-foreground">admin@example.com</span>
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
              >
                Logout
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  )
}
