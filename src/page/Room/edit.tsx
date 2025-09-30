import {useState} from "react";
import {Button} from "@heroui/button";
import {
    Bath,
    Bed,
    DollarSign,
    Hash,
    Home,
    Layers,
    MapPin,
    Maximize2,
    Save,
    Users
} from "lucide-react";
import {useNavigate} from "react-router";
import {Card, CardBody} from "@heroui/card";
import {Input, Textarea} from "@heroui/input";
import {Select, SelectItem} from "@heroui/react";

export default function RoomEditPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        roomNo: "100",
        floor: "1",
        dimension: "1200x2000sqft",
        noOfBedRoom: "2",
        noOfBathRoom: "2",
        status: "Occupied",
        sellingPrice: "200000",
        maxNoPeople: "5",
        description: "Welcome to Oceanview Retreat, an exquisite beachfront property located in the vibrant city of Miami, Florida. Situated along the pristine shores of the Atlantic Ocean, this luxurious estate offers a truly unparalleled coastal living experience. With breathtaking panoramic views of the ocean and direct access to a private white sandy beach, Oceanview Retreat is a haven for relaxation and rejuvenation. Immerse yourself in the soothing sounds of the waves and indulge in the serenity of the surroundings",
        address: "969 Tha Khin Rd. Yangon, Myanmar 96900",
        tenant: "Bhone Wai",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleCancel = () => {
        navigate('/room/detail')
    }

    const handleSubmit = () => {

    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            })
        }
    }

    return (
        <div className={"p-8 space-y-4"}>
            <div className={"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"}>
                <div>
                    <h1 className={"text-2xl font-semibold"}>Edit Room {formData.roomNo}</h1>
                    <p className={"text-sm text-default-500 mt-1"}>Update room information and details</p>
                </div>

                <div className={"flex gap-2"}>
                    <Button
                        onClick={handleCancel}
                        variant={"bordered"}
                        className={"border-[0.5px]"}
                    >
                        Cancel
                    </Button>
                    <Button
                        color={"primary"}
                        startContent={<Save size={16} />}
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className={"bg-gray-200/20 rounded-2xl p-4 md:p-7 space-y-6"}>
                <Card className="rounded-3xl shadow-none">
                    <CardBody className={"p-6"}>
                        <h3 className={"text-lg font-semibold mb-6 flex items-center gap-2"}>
                            <Home size={20} className={"text-default-500"} />
                            Basic Information
                        </h3>

                        <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
                            <Input
                                label={"Room Number"}
                                labelPlacement={"outside"}
                                placeholder={"Enter room number"}
                                value={formData.roomNo}
                                onChange={(e) => handleInputChange("roomNo", e.target.value)}
                                variant={"bordered"}
                                classNames={{
                                    inputWrapper: "border-[0.5px]"
                                }}
                                startContent={<Hash size={18} className={"text-default-400"} />}
                                isInvalid={!!errors.roomNo}
                                errorMessage={errors.roomNo}
                            />

                            <Select
                                label={"Floor"}
                                labelPlacement={"outside"}
                                placeholder={"Select floor"}
                                variant={"bordered"}
                                classNames={{
                                    trigger: "border-[0.5px]"
                                }}
                                selectedKeys={[formData.floor]}
                                onChange={(e) => handleInputChange("floor", e.target.value)}
                                startContent={<Layers size={18} className={"text-default-400"} />}
                                isInvalid={!!errors.floor}
                                errorMessage={errors.floor}
                            >
                                <SelectItem key={"1"}>1st Floor</SelectItem>
                                <SelectItem key={"2"}>2nd Floor</SelectItem>
                                <SelectItem key={"3"}>3rd Floor</SelectItem>
                                <SelectItem key={"4"}>4th Floor</SelectItem>
                                <SelectItem key={"5"}>5th Floor</SelectItem>
                            </Select>

                            <Input
                                label={"Dimension"}
                                labelPlacement={"outside"}
                                placeholder={"e.g., 1200x1200sqft"}
                                value={formData.dimension}
                                onChange={(e) => handleInputChange("dimension", e.target.value)}
                                variant={"bordered"}
                                classNames={{ inputWrapper: "border-[0.5px]" }}
                                startContent={<Maximize2 size={18} className={"text-default-400"} />}
                                isInvalid={!!errors.dimension}
                                errorMessage={errors.dimension}
                            />

                            <Select
                                label={"Status"}
                                labelPlacement={"outside"}
                                placeholder={"Select status"}
                                variant={"bordered"}
                                classNames={{ trigger: "border-[0.5px]" }}
                                selectedKeys={[formData.status]}
                                onChange={(e) => handleInputChange("status", e.target.value)}
                            >
                                <SelectItem key={"Available"}>Available</SelectItem>
                                <SelectItem key={"Occupied"}>Occupied</SelectItem>
                                <SelectItem key={"Reserved"}>Reserved</SelectItem>
                                <SelectItem key={"Maintenance"}>Under Maintenance</SelectItem>
                            </Select>
                        </div>
                    </CardBody>
                </Card>

                <Card className={"rounded-3xl shadow-none"}>
                    <CardBody className={"p-6"}>
                        <h3 className={"text-lg font-semibold mb-6 flex items-center gap-2"}>
                            <Bed size={20} className="text-default-500" />
                            Room Features
                        </h3>

                        <div className={"grid grid-cols-1 md:grid-cols-3 gap-6"}>
                            <Select
                                label={"Number of Bedrooms"}
                                labelPlacement={"outside"}
                                placeholder={"Select bedrooms"}
                                variant={"bordered"}
                                classNames={{
                                    trigger: "border-[0.5px]"
                                }}
                                selectedKeys={[formData.noOfBedRoom]}
                                onChange={(e) => handleInputChange("noOfBedRoom", e.target.value)}
                                startContent={<Bed size={18} className={"text-default-400"} />}
                                isInvalid={!!errors.noOfBedRoom}
                                errorMessage={errors.noOfBedRoom}
                            >
                                <SelectItem key={"1"}>1 Bedroom</SelectItem>
                                <SelectItem key={"2"}>2 Bedrooms</SelectItem>
                                <SelectItem key={"3"}>3 Bedrooms</SelectItem>
                                <SelectItem key={"4"}>4 Bedrooms</SelectItem>
                                <SelectItem key={"5"}>5+ Bedrooms</SelectItem>
                            </Select>

                            <Select
                                label={"Number of Bathrooms"}
                                labelPlacement={"outside"}
                                placeholder={"Select bathrooms"}
                                variant={"bordered"}
                                classNames={{
                                    trigger: "border-[0.5px]"
                                }}
                                selectedKeys={[formData.noOfBathRoom]}
                                onChange={(e) => handleInputChange("noOfBathRoom", e.target.value)}
                                startContent={<Bath size={18} className={"text-default-400"} />}
                                isInvalid={!!errors.noOfBathRoom}
                                errorMessage={errors.noOfBathRoom}
                            >
                                <SelectItem key={"1"}>1 Bathroom</SelectItem>
                                <SelectItem key={"2"}>2 Bathrooms</SelectItem>
                                <SelectItem key={"3"}>3 Bathrooms</SelectItem>
                                <SelectItem key={"4"}>4 Bathrooms</SelectItem>
                            </Select>

                            <Input
                                label={"Maximum Occupancy"}
                                labelPlacement={"outside"}
                                placeholder={"Maximum number of people"}
                                type={"number"}
                                value={formData.maxNoPeople}
                                onChange={(e) => handleInputChange("maxNoPeople", e.target.value)}
                                variant={"bordered"}
                                classNames={{ inputWrapper: "border-[0.5px]" }}
                                startContent={<Users size={18} className={"text-default-400"} />}
                                isInvalid={!!errors.maxNoPeople}
                                errorMessage={errors.maxNoPeople}
                            />
                        </div>
                    </CardBody>
                </Card>

                <Card className={"rounded-3xl shadow-none"}>
                    <CardBody className={"p-6"}>
                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <DollarSign size={20} className="text-default-500" />
                            Pricing & Tenant Information
                        </h3>

                        <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
                            <Input
                                label={"Monthly Rate (MMK)"}
                                labelPlacement={"outside"}
                                placeholder={"Enter monthly rate"}
                                type={"number"}
                                value={formData.sellingPrice}
                                onChange={(e) => handleInputChange("sellingPrice", e.target.value)}
                                variant={"bordered"}
                                classNames={{ inputWrapper: "border-[0.5px]" }}
                                startContent={<DollarSign size={18} className={"text-default-400"} />}
                                isInvalid={!!errors.sellingPrice}
                                errorMessage={errors.sellingPrice}
                            />

                            <Input
                                label={"Current Tenant"}
                                labelPlacement={"outside"}
                                placeholder={"Enter tenant name (if occupied)"}
                                value={formData.tenant}
                                onChange={(e) => handleInputChange("tenant", e.target.value)}
                                variant={"bordered"}
                                classNames={{ inputWrapper: "border-[0.5px]" }}
                                startContent={<DollarSign size={18} className={"text-default-400"} />}
                                isDisabled={formData.status === "Occupied"}
                            />
                        </div>
                    </CardBody>
                </Card>

                <Card className={"rounded-3xl shadow-none"}>
                    <CardBody className={"p-6"}>
                        <h3 className={"text-lg font-semibold mb-6 flex items-center gap-2"}>
                            <MapPin size={20} className="text-default-500" />
                            Location & Description
                        </h3>

                        <div className={"space-y-6"}>
                            <Input
                                label={"Address"}
                                labelPlacement={"outside"}
                                placeholder={"Enter complete address"}
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                                variant={"bordered"}
                                classNames={{ inputWrapper: "border-[0.5px]" }}
                                startContent={<MapPin size={18} className={"text-default-400"} />}
                                isInvalid={!!errors.address}
                                errorMessage={errors.address}
                            />

                            <Textarea
                                label={"Description"}
                                labelPlacement={"outside"}
                                placeholder={"Enter room description..."}
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                variant={"bordered"}
                                classNames={{ inputWrapper: "border-[0.5px]" }}
                                minRows={4}
                                maxRows={8}
                                isInvalid={!!errors.description}
                                errorMessage={errors.description}
                            />
                        </div>
                    </CardBody>
                </Card>

                <div className={"flex flex-col sm:flex-row gap-3 pt-4"}>
                    <Button
                        variant="bordered"
                        size="lg"
                        className="flex-1 border-[0.5px]"
                        onClick={handleCancel}
                    >
                        Cancel Changes
                    </Button>
                    <Button
                        className="bg-foreground text-white flex-1"
                        size="lg"
                        startContent={<Save size={18} />}
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    )
}