import {
    Download, Home,
    Layers,
    MapPin,
    Pencil,
    Trash2,
} from "lucide-react";
import {Button} from "@heroui/button";
import {Chip} from "@heroui/react";
import {Card, CardBody} from "@heroui/card";
import {useNavigate} from "react-router";

export default function RoomDetailPage() {
    const navigate = useNavigate();
    const roomData = {
        roomNo: 100,
        floor: 1,
        dimension: "1200x2400sqft",
        noOfBedRoom: 2,
        noOfBathRoom: 2,
        status: "Occupied",
        sellingPrice: 2200000,
        maxNoPeople: 5,
        description: "Welcome to Oceanview Retreat, an exquisite beachfront property located in the vibrant city of Miami, Florida. Situated along the pristine shores of the Atlantic Ocean, this luxurious estate offers a truly unparalleled coastal living experience. With breathtaking panoramic views of the ocean and direct access to a private white sandy beach, Oceanview Retreat is a haven for relaxation and rejuvenation. Immerse yourself in the soothing sounds of the waves and indulge in the serenity of the surroundings",
        address: "969 Tha Khin Rd. Yangon, Myanmar 96900",
        createdDate: "Oct 18, 2024",
        tenant: "Bhone Wai",
    }

    const handleEditRoom = () => {
        navigate('/room/edit')
    }

    const getStatusColor = (status: string) => {
        switch (roomData.status.toLowerCase()) {
            case "available": return 'bg-green-400';
            case "occupied": return 'bg-amber-400';
            case "reserved": return 'bg-purple-400';
            default: return "bg-gray-400";
        }
    }

    return (
        <div className={"p-8 space-y-4"}>
            <div className={"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"}>
                <div>
                    <h1 className={"text-2xl font-semibold"}>Room {roomData.roomNo}</h1>
                    <div className={"flex items-start gap-1 text-sm text-default-500 mt-1"}>
                        <MapPin size={16} />
                        <span>{roomData.address}</span>
                    </div>
                </div>

                <div className={"flex gap-2"}>
                    <Button
                        onClick={handleEditRoom}
                        variant={"bordered"}
                        className={"border-[0.5px]"}
                        startContent={<Pencil size={16} />}
                    >
                        Edit
                    </Button>
                    <Button
                        color={"danger"}
                        variant={"flat"}
                        startContent={<Trash2 size={16} />}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            <div className={"bg-gray-200/20 rounded-2xl p-4 md:p-7 space-y-6"}>
                <div className={"flex justify-between items-center"}>
                    <Chip
                        size={"sm"}
                        variant={"flat"}
                        color={"default"}
                        startContent={
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(roomData.status)}`} />
                        }
                    >
                        {roomData.status}
                    </Chip>
                    <h2 className={"text-2xl font-semibold"}>
                        MMK {roomData.sellingPrice.toFixed(2)}
                    </h2>
                </div>

                {/*<div className={"flex flex-wrap gap-3"}>
                    <Chip
                        variant="bordered"
                        startContent={<Bed size={18} />}
                        className="flex items-center gap-2 border-1 border-gray-300/40 rounded-lg px-3 py-2 bg-white"
                    >
                        <span className="font-medium">{roomData.noOfBedRoom} Bedrooms</span>
                    </Chip>
                    <Chip
                        variant="bordered"
                        startContent={<Bath size={18} />}
                        className="flex items-center gap-2 border-1 border-gray-300/40 rounded-lg px-3 py-2 bg-white"
                    >
                        <span className="font-medium">{roomData.noOfBathRoom} Bathrooms</span>
                    </Chip>
                    <Chip
                        variant="bordered"
                        startContent={<Layers size={18} />}
                        className="flex items-center gap-2 border-1 border-gray-300/40 rounded-lg px-3 py-2 bg-white"
                    >
                        <span className="font-medium">Floor {roomData.floor}</span>
                    </Chip>
                    <Chip
                        variant="bordered"
                        startContent={<Maximize2 size={18} />}
                        className="flex items-center gap-2 border-1 border-gray-300/40 rounded-lg px-3 py-2 bg-white"
                    >
                        <span className="font-medium">{roomData.dimension}</span>
                    </Chip>
                    <Chip
                        variant="bordered"
                        startContent={<Users size={18} />}
                        className="flex items-center gap-2 border-1 border-gray-300/40 rounded-lg px-3 py-2 bg-white"
                    >
                        <span className="font-medium">Max {roomData.maxNoPeople} People</span>
                    </Chip>
                    <Chip
                        variant="bordered"
                        startContent={<Calendar size={18} />}
                        className="flex items-center gap-2 border-1 border-gray-300/40 rounded-lg px-3 py-2 bg-white"
                    >
                        <span className="font-medium">{roomData.createdDate}</span>
                    </Chip>
                    {roomData.tenant && (
                        <Chip
                            variant="bordered"
                            startContent={<User size={18} />}
                            className="flex items-center gap-2 border-1 border-gray-300/40 rounded-lg px-3 py-2 bg-white"
                        >
                            <span className="font-medium">{roomData.tenant}</span>
                        </Chip>
                    )}
                </div>*/}

                <div className={"grid grid-cols-1 lg:grid-cols-2 gap-6"}>
                    <Card className={"rounded-3xl shadow-none"}>
                        <CardBody className={"p-6"}>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Home size={20} className="text-default-500" />
                                Description
                            </h3>
                            <p className="text-default-600 leading-relaxed">
                                {roomData.description}
                            </p>
                        </CardBody>
                    </Card>

                    <Card className={"rounded-3xl shadow-none"}>
                        <CardBody className={"p-6"}>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Layers size={20} className="text-default-500" />
                                Room Information
                            </h3>
                            <div className={"space-y-3"}>
                                <div className={"flex justify-between py-2 border-b border-default-100"}>
                                    <span className={"text-default-500"}>Room Number</span>
                                    <span className={"text-default-700 font-medium"}>{roomData.roomNo}</span>
                                </div>
                                <div className={"flex justify-between py-2 border-b border-default-100"}>
                                    <span className={"text-default-500"}>Floor</span>
                                    <span className={"text-default-700 font-medium"}>{roomData.floor}</span>
                                </div>
                                <div className={"flex justify-between py-2 border-b border-default-100"}>
                                    <span className={"text-default-500"}>Dimension</span>
                                    <span className={"text-default-700 font-medium"}>{roomData.dimension}</span>
                                </div>
                                <div className={"flex justify-between py-2 border-b border-default-100"}>
                                    <span className={"text-default-500"}>Bedrooms</span>
                                    <span className={"text-default-700 font-medium"}>{roomData.noOfBedRoom}</span>
                                </div>
                                <div className={"flex justify-between py-2 border-b border-default-100"}>
                                    <span className={"text-default-500"}>Bathrooms</span>
                                    <span className={"text-default-700 font-medium"}>{roomData.noOfBathRoom}</span>
                                </div>
                                <div className={"flex justify-between py-2 border-b border-default-100"}>
                                    <span className={"text-default-500"}>Max Occupancy</span>
                                    <span className={"text-default-700 font-medium"}>{roomData.maxNoPeople}</span>
                                </div>
                                <div className={"flex justify-between py-2 border-b border-default-100"}>
                                    <span className={"text-default-500"}>Monthly Rate</span>
                                    <span className={"text-default-700 font-medium"}>
                                        MMK {roomData.sellingPrice.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className={"flex flex-col sm:flex-row gap-3 pt-4"}>
                    <Button
                        className={"bg-foreground text-white flex-1"}
                        size={"lg"}
                        startContent={<Download size={18} />}
                    >
                        Download Room Details
                    </Button>
                    <Button
                        variant="bordered"
                        size="lg"
                        className="flex-1 border-[0.5px]"
                        onClick={() => navigate(`/room/${roomData.roomNo}/utilities`)}
                    >
                        View Utility History
                    </Button>
                </div>
            </div>
        </div>
    )
}