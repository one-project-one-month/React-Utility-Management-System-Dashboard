import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Chip,
  DatePicker,
  DateRangePicker,
  Radio,
  RadioGroup,
} from "@heroui/react";
import NavigationBreadCrumbs from "@/components/breadcrumb";
import { breadcrumbs } from "@/constants/breadcrumbs";
import { ArrowLeftFromLine, UserIcon } from "lucide-react";
import FormDrawer from "@/components/form-drawer";
import { SkeletonLoader } from "@/components/skeleton-loader";
import DataTableExample from "@/components/DataTableExample";
import TablePagination from "@/components/DataTableExample/table-pagination";

const rooms = Array.from({ length: 80 }, (_, i) => {
  const roomNumber = 100 + i * 10;
  return {
    label: `Room ${roomNumber}`,
    key: `room-${roomNumber}`,
    description: `Description for Room ${roomNumber}`,
  };
});

export default function HomePage() {
  return (
    <div className="p-4 grid grid-cols-4 gap-3 h-[84vh] overflow-y-auto custom-scrollbar-3">
      <div aria-labelledby="autocomplete-usage">
        <p className="text-sm mb-2">
          Use <code> Autocomplete</code> when there are multiple of items
        </p>
        <Autocomplete className="max-w-xs" label="Select a room" size="sm">
          {rooms.map((room) => (
            <AutocompleteItem key={room.key}>{room.label}</AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <div aria-labelledby="breadcrumbs-usage">
        <p className="text-red-700">Use this in every page of the dashboard</p>
        <NavigationBreadCrumbs items={breadcrumbs.example} />
      </div>
      <div aria-labelledby="buttons" className="space-x-2 space-y-3">
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
        <Button isLoading color="primary">
          Loading
        </Button>
        <Button color="danger" startContent={<UserIcon />} variant="bordered">
          Delete user
        </Button>
      </div>
      <div aria-labelledby="checkbox">
        <Checkbox defaultSelected size="sm">
          Use Small Checkbox
        </Checkbox>
        <CheckboxGroup
          className="mt-5"
          size="sm"
          defaultValue={["bruno-fernandes"]}
          label="Select players"
        >
          <Checkbox value="bruno-fernandes">Bruno Fernandes</Checkbox>
          <Checkbox value="rashford">Marcus Rashford</Checkbox>
          <Checkbox value="garnacho">Alejandro Garnacho</Checkbox>
          <Checkbox value="martinez">Lisandro Martínez</Checkbox>
          <Checkbox value="onana">André Onana</Checkbox>
        </CheckboxGroup>
      </div>
      <div aria-labelledby="chip" className="space-x-1">
        <p>Use this for status related things</p>
        <Chip radius="sm" color="danger">
          Overdue
        </Chip>
        <Chip radius="sm" color="warning">
          Pending
        </Chip>
        <Chip radius="sm" color="success">
          Paid
        </Chip>
      </div>
      <div aria-labelledby="date-picker" className="space-y-2">
        <p>Use for normal Date Input</p>
        <DatePicker className="max-w-[284px]" label="Contract Date" />
        <p>Useful for date range</p>
        <DateRangePicker className="max-w-xs" label="Choose Date Between" />
      </div>
      <div className="space-y-2" aria-labelledby="drawer-example">
        <p>Drawer Example</p>
        <FormDrawer btnText="Create New Contract" title="New Contract">
          <p>Form Component Goes Here</p>
        </FormDrawer>
        <FormDrawer
          btnText="Open From Left"
          title="New Contract"
          position="left"
          icon={<ArrowLeftFromLine />}
        >
          <p>Form Component Goes Here</p>
        </FormDrawer>
      </div>
      <div aria-labelledby="radio-group">
        <RadioGroup color="primary" defaultValue="Wunna" label="Select Me">
          <Radio value="wunna">Wunna</Radio>
          <Radio value="wunna-aung">Wunna Aung</Radio>
        </RadioGroup>
      </div>
      <div aria-labelledby="skeleton-loaders" className="space-y-3">
        <p>Use this in loading state for table row</p>
        <SkeletonLoader /> {/* default 6rem height */}
        <SkeletonLoader height="3rem" width="50%" />
        <SkeletonLoader height="10rem" rounded="rounded-xl" className="mt-4" />
      </div>
      <div className="col-span-2">
        <DataTableExample />
        <TablePagination />
      </div>
    </div>
  );
}
