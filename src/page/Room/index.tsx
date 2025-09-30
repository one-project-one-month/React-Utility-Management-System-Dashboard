import { useState, useMemo } from "react";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {
    Bath,
    Bed,
    Clock, Filter,
    Layers,
    MapPin,
    Maximize2,
    Pencil,
    Search,
    Trash2,
    Upload,
    User
} from "lucide-react";
import {Card, CardBody} from "@heroui/card";
import {Chip, Select, SelectItem} from "@heroui/react";
import {useNavigate} from "react-router";
import type {Room} from "@/types/room.ts";
import {roomMockData, statusColors, statusLabels} from "@/constants/roomMockData";

export default function RoomPage() {
    const navigate = useNavigate();
    const [rooms] = useState<Room[]>(roomMockData);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterBathrooms, setFilterBathrooms] = useState<string>("");
    const [filterBedrooms, setFilterBedrooms] = useState<string>("");
    const [filterFloor, setFilterFloor] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [filterPrice, setFilterPrice] = useState<string>("");

    const handleEditRoom = (roomId: string) => {
        navigate(`/room/edit/${roomId}`);
    };

    const handleDeleteRoom = (roomId: string) => {
        console.log('Delete room:', roomId);
    };

    const filteredAndSortedRooms = useMemo(() => {
        let filtered = [...rooms];

        if (searchTerm) {
            filtered = filtered.filter(room => 
                room.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                room.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                room.tenant.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterBathrooms) {
            filtered = filtered.filter(room => room.bathrooms === parseInt(filterBathrooms));
        }

        if (filterBedrooms) {
            filtered = filtered.filter(room => room.bedrooms === parseInt(filterBedrooms));
        }

        if (filterFloor) {
            filtered = filtered.filter(room => room.floor === parseInt(filterFloor));
        }

        if (filterStatus && filterStatus !== "all") {
            filtered = filtered.filter(room => room.status === filterStatus);
        }

        if (filterPrice) {
            const priceValue = parseFloat(filterPrice) * 100000;
            filtered = filtered.filter(room => room.price <= priceValue);
        }

        filtered.sort((a, b) => a.roomNo.localeCompare(b.roomNo));

        return filtered;
    }, [rooms, searchTerm, filterBathrooms, filterBedrooms, filterFloor, filterStatus, filterPrice]);

    const handleApplyFilters = () => {
        console.log('Filters applied');
    };

    const handleResetFilters = () => {
        setSearchTerm("");
        setFilterBathrooms("");
        setFilterBedrooms("");
        setFilterFloor("");
        setFilterStatus("all");
        setFilterPrice("");
    };

    return (
        <div className="p-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
                <Input
                    placeholder="Search"
                    variant="bordered"
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                    startContent={<Search size={18} className="text-default-400" />}
                    classNames={{
                        base: "flex-1",
                        inputWrapper: "border-[0.5px]"
                    }}
                />
                <div className="grid grid-cols-2 sm:flex gap-2">
                    <Button
                        color="default"
                        variant="bordered"
                        startContent={<Filter size={16} className={"stroke-primary fill-primary"} />}
                        className="w-full sm:w-auto border-1 border-primary"
                        onClick={handleResetFilters}
                    >
                        Reset Filters
                    </Button>
                    <Button
                        color="default"
                        variant="bordered"
                        startContent={<Upload size={16} />}
                        className="w-full sm:w-auto border-[0.5px]"
                    >
                        Export to CSV
                    </Button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
                <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 flex-1">
                    <Select
                        key={"bedrooms"}
                        label="Bedrooms"
                        labelPlacement={"outside"}
                        placeholder="---"
                        variant={"bordered"}
                        selectedKeys={filterBedrooms ? [filterBedrooms] : []}
                        onSelectionChange={(keys) => setFilterBedrooms(Array.from(keys)[0] as string)}
                        classNames={{
                            trigger: "border-[0.5px] ",
                            value: "text-black",
                        }}
                    >
                        <SelectItem key="1">1</SelectItem>
                        <SelectItem key="2">2</SelectItem>
                        <SelectItem key="3">3</SelectItem>
                    </Select>
                    <Select
                        key={"bathrooms"}
                        label="Bathrooms"
                        labelPlacement={"outside"}
                        placeholder="---"
                        variant={"bordered"}
                        selectedKeys={filterBathrooms ? [filterBathrooms] : []}
                        onSelectionChange={(keys) => setFilterBathrooms(Array.from(keys)[0] as string)}
                        classNames={{
                            trigger: "border-[0.5px] ",
                            value: "text-black",
                        }}
                    >
                        <SelectItem key="1">1</SelectItem>
                        <SelectItem key="2">2</SelectItem>
                        <SelectItem key="3">3</SelectItem>
                    </Select>
                    <Select
                        key={"floor"}
                        label="Floor"
                        labelPlacement={"outside"}
                        placeholder="---"
                        variant={"bordered"}
                        selectedKeys={filterFloor ? [filterFloor] : []}
                        onSelectionChange={(keys) => setFilterFloor(Array.from(keys)[0] as string)}
                        classNames={{
                            trigger: "border-[0.5px] ",
                            value: "text-black",
                        }}
                    >
                        <SelectItem key="1">1</SelectItem>
                        <SelectItem key="2">2</SelectItem>
                        <SelectItem key="3">3</SelectItem>
                    </Select>
                    <Select
                        key={"status"}
                        label="Status"
                        labelPlacement={"outside"}
                        variant={"bordered"}
                        selectedKeys={[filterStatus]}
                        onSelectionChange={(keys) => setFilterStatus(Array.from(keys)[0] as string)}
                        classNames={{
                            trigger: "border-[0.5px] ",
                            value: "text-black",
                        }}
                    >
                        <SelectItem key="all">All</SelectItem>
                        <SelectItem key="available">Available</SelectItem>
                        <SelectItem key="occupied">Occupied</SelectItem>
                        <SelectItem key="reserved">Reserved</SelectItem>
                    </Select>
                    <Select
                        key={"price"}
                        label="Price"
                        labelPlacement={"outside"}
                        placeholder="---"
                        variant={"bordered"}
                        selectedKeys={filterPrice ? [filterPrice] : []}
                        onSelectionChange={(keys) => setFilterPrice(Array.from(keys)[0] as string)}
                        classNames={{
                            trigger: "border-[0.5px] ",
                            value: "text-black",
                        }}
                    >
                        <SelectItem key="1">100,000.00</SelectItem>
                        <SelectItem key="2">200,000.00</SelectItem>
                        <SelectItem key="3">300,000.00</SelectItem>
                    </Select>
                </div>
                <Button
                    color={"primary"}
                    className="sm:mt-6 w-full sm:w-auto"
                    onClick={handleApplyFilters}
                >
                    Apply
                </Button>
            </div>

            <div className="bg-gray-200/20 rounded-2xl p-4 md:p-7 space-y-4">
                <h3 className="text-lg font-medium">
                    Rooms: <span className="text-gray-400">{filteredAndSortedRooms.length}</span>
                </h3>

                <div className="space-y-4">
                    {filteredAndSortedRooms.map((room) => (
                        <Card key={room.id} className="w-full rounded-3xl shadow-none">
                            <CardBody className="p-3">
                                <div className="flex flex-col md:flex-row gap-4 p-3">
                                    <div className="flex-1 flex flex-col justify-center gap-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-xl font-semibold">
                                                    {room.roomNo}
                                                </h3>
                                                <Chip
                                                    size="sm"
                                                    variant="flat"
                                                    color="default"
                                                    className="bg-gray-100"
                                                    startContent={
                                                        <div className={`w-2 h-2 rounded-full ${statusColors[room.status]}`} />
                                                    }
                                                >
                                                    {statusLabels[room.status]}
                                                </Chip>
                                            </div>
                                            <div className="flex items-start gap-1 text-sm text-default-500">
                                                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                                                <span>{room.address}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 text-sm text-default-600">
                                            <Chip
                                                variant="bordered"
                                                startContent={<Bed size={18} />}
                                                className={"flex items-center gap-2 border-1 border-gray-300/40 rounded-lg px-2"}
                                            >
                                                <span>{room.bedrooms}</span>
                                            </Chip>
                                            <Chip
                                                variant="bordered"
                                                startContent={<Bath size={18} />}
                                                className={"flex items-center gap-2 border-1 border-gray-300/40 rounded-lg px-2"}
                                            >
                                                <span>{room.bathrooms}</span>
                                            </Chip>
                                            <Chip
                                                variant="bordered"
                                                startContent={<Layers size={18} />}
                                                className={"flex items-center gap-2 border-1 border-gray-300/40 rounded-lg px-2"}
                                            >
                                                <span>Floor {room.floor}</span>
                                            </Chip>
                                            <Chip
                                                variant="bordered"
                                                startContent={<Maximize2 size={18} />}
                                                className={"flex items-center gap-2 border-1 border-gray-300/40 rounded-lg px-2"}
                                            >
                                                <span>{room.dimension} sqft</span>
                                            </Chip>
                                            <Chip
                                                variant="bordered"
                                                startContent={<Clock size={18} />}
                                                className={"flex items-center gap-2 border-1 border-gray-300/40 rounded-lg px-2"}
                                            >
                                                <span>{room.createdDate}</span>
                                            </Chip>
                                            <Chip
                                                variant="bordered"
                                                startContent={<User size={18} />}
                                                className={"flex items-center gap-2 border-1 border-gray-300/40 rounded-lg px-2"}
                                            >
                                                <span>{room.tenant}</span>
                                            </Chip>
                                        </div>
                                    </div>

                                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:min-w-fit">
                                        <div className="text-lg font-semibold">
                                            MMK{room.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleEditRoom(room.id)}
                                                isIconOnly
                                                variant="light"
                                                color="default"
                                                aria-label="Edit property"
                                            >
                                                <Pencil size={20} className="text-default-500" />
                                            </Button>
                                            <Button
                                                onClick={() => handleDeleteRoom(room.id)}
                                                isIconOnly
                                                variant="light"
                                                color="danger"
                                                aria-label="Delete property"
                                            >
                                                <Trash2 size={20} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                    {filteredAndSortedRooms.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No rooms found matching the current filters.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
