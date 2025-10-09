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
    Save, User,
    Users
} from "lucide-react";
import {useNavigate, useParams} from "react-router";
import {Input, Textarea} from "@heroui/input";
import {roomMockData} from "@/constants/roomMockData.ts";
import {RoomCard} from "@/components/Room/room-card.tsx";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type RoomEditFormData, roomEditSchema} from "@/schemas/roomSchema.ts";
import {FormSelect} from "@/components/Form/form-select.tsx";

const FLOOR_OPTIONS = [
    { key: "1", label: "1st Floor" },
    { key: "2", label: "2nd Floor" },
    { key: "3", label: "3rd Floor" },
    { key: "4", label: "4th Floor" },
    { key: "5", label: "5th Floor" },
];

const STATUS_OPTIONS = [
    { key: "available", label: "Available" },
    { key: "rented", label: "Rented" },
    { key: "purchased", label: "Purchased" },
    { key: "maintenance", label: "Maintenance" },
];

const BEDROOM_OPTIONS = [
    { key: "1", label: "1 Bedroom" },
    { key: "2", label: "2 Bedrooms" },
    { key: "3", label: "3 Bedrooms" },
    { key: "4", label: "4 Bedrooms" },
    { key: "5", label: "5+ Bedrooms" },
];

const BATHROOM_OPTIONS = [
    { key: "1", label: "1 Bathroom" },
    { key: "2", label: "2 Bathrooms" },
    { key: "3", label: "3 Bathrooms" },
    { key: "4", label: "4 Bathrooms" },
];

export default function RoomEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const room = roomMockData.find(r => r.id === id);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RoomEditFormData>({
        resolver: zodResolver(roomEditSchema),
        defaultValues: {
            roomNo: room?.roomNo || "",
            bedrooms: room?.bedrooms ? String(room.bedrooms) : "",
            bathrooms: room?.bathrooms ? String(room.bathrooms) : "",
            floor: room?.floor ? String(room.floor) : "",
            dimension: room?.dimension ? String(room.dimension) : "",
            status: room?.status || "",
            tenant: room?.tenant || "",
            price: room?.price ? String(room.price) : "",
            maxNoPeople: room?.maxNoPeople ? String(room.maxNoPeople) : "",
            address: room?.address || "",
            description: room?.description || "",
        }
    });

    if (!room) {
        return (
            <div className="p-8">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold mb-4">Room Not Found</h1>
                    <Button onPress={() => navigate('/room')}>
                        Back to Rooms
                    </Button>
                </div>
            </div>
        )
    }

    const handleCancel = () => {
        navigate(`/rooms/${id}`)
    }

    const onSubmit = (data: RoomEditFormData) => {
        console.log("Form submitted", data);
        const submittedData = {
            ...data,
            bedrooms: Number(data.bedrooms),
            bathrooms: Number(data.bathrooms),
            floor: Number(data.floor),
            dimension: Number(data.dimension),
            price: Number(data.price),
            maxNoPeople: Number(data.maxNoPeople),
        }
        console.log("Converted data:", submittedData);
    }

    return (
        <div className={"p-8 space-y-4"}>
            <div className={"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"}>
                <div>
                    <h1 className={"text-2xl font-semibold"}>Edit Room {room.roomNo}</h1>
                    <p className={"text-sm text-default-500 mt-1"}>Update room information and details</p>
                </div>

                <div className={"flex gap-2"}>
                    <Button
                        onPress={handleCancel}
                        variant={"bordered"}
                        className={"border-[0.5px]"}
                    >
                        Cancel
                    </Button>
                    <Button
                        color={"primary"}
                        startContent={<Save size={16} />}
                        type={"submit"}
                    >
                        Save Changes
                    </Button>
            </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={"bg-gray-200/20 rounded-2xl p-4 md:p-7 space-y-6"}>
                <RoomCard title={"Basic Information"} icon={Home}>
                    <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
                        <Controller
                            name={"roomNo"}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label={"Room Number"}
                                    labelPlacement={"outside"}
                                    placeholder={"Enter room number"}
                                    variant={"bordered"}
                                    classNames={{ inputWrapper: "border-[0.5px]" }}
                                    startContent={<Hash size={18} className={"text-default-400"} />}
                                    isInvalid={!!errors.roomNo}
                                    errorMessage={errors.roomNo?.message}
                                />
                            )}
                        />

                        <Controller
                            name={"floor"}
                            control={control}
                            render={({ field }) => (
                                <FormSelect
                                    label={"Floor"}
                                    options={FLOOR_OPTIONS}
                                    value={field.value}
                                    onChange={field.onChange}
                                    startContent={<Layers size={18} className={"text-default-400"} />}
                                    isInvalid={!!errors.floor}
                                    errorMessage={errors.floor?.message}
                                />
                            )}
                        />

                        <Controller
                            name={"dimension"}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label={"Dimension"}
                                    labelPlacement={"outside"}
                                    placeholder={"e.g., 1200x1200sqft"}
                                    variant={"bordered"}
                                    classNames={{ inputWrapper: "border-[0.5px]" }}
                                    startContent={<Maximize2 size={18} className={"text-default-400"} />}
                                    isInvalid={!!errors.dimension}
                                    errorMessage={errors.dimension?.message}
                                />
                            )}
                        />

                        <Controller
                            name={"status"}
                            control={control}
                            render={({ field }) => (
                                <FormSelect
                                    label={"Status"}
                                    options={STATUS_OPTIONS}
                                    value={field.value}
                                    onChange={field.onChange}
                                    isInvalid={!!errors.status}
                                    errorMessage={errors.status?.message}
                                />
                            )}
                        />
                    </div>
                </RoomCard>

                <RoomCard title={"Room Features"} icon={Bed}>
                    <div className={"grid grid-cols-1 md:grid-cols-3 gap-6"}>
                        <Controller
                            name={"bedrooms"}
                            control={control}
                            render={({ field }) => (
                                <FormSelect
                                    label={"Bedrooms"}
                                    options={BEDROOM_OPTIONS}
                                    value={field.value}
                                    onChange={field.onChange}
                                    startContent={<Bed size={18} className={"text-default-400"} />}
                                    isInvalid={!!errors.bedrooms}
                                    errorMessage={errors.bedrooms?.message}
                                />
                            )}
                        />

                        <Controller
                            name={"bathrooms"}
                            control={control}
                            render={({ field }) => (
                                <FormSelect
                                    label={"Bathrooms"}
                                    options={BATHROOM_OPTIONS}
                                    value={field.value}
                                    onChange={field.onChange}
                                    startContent={<Bath size={18} className={"text-default-400"} />}
                                    isInvalid={!!errors.bathrooms}
                                    errorMessage={errors.bathrooms?.message}
                                />
                            )}
                        />

                        <Controller
                            name={"maxNoPeople"}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label={"Maximum Occupancy"}
                                    labelPlacement={"outside"}
                                    placeholder={"Maximum number of people"}
                                    type={"number"}
                                    variant={"bordered"}
                                    classNames={{ inputWrapper: "border-[0.5px]" }}
                                    startContent={<Users size={18} className={"text-default-400"} />}
                                    isInvalid={!!errors.maxNoPeople}
                                    errorMessage={errors.maxNoPeople?.message}
                                />
                            )}
                        />
                    </div>
                </RoomCard>

                <RoomCard title={"Pricing & Tenant Information"} icon={DollarSign}>
                    <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
                        <Controller
                            name={"price"}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label={"Monthly Rate (MMK)"}
                                    labelPlacement={"outside"}
                                    placeholder={"Enter monthly rate"}
                                    type={"number"}
                                    variant={"bordered"}
                                    classNames={{ inputWrapper: "border-[0.5px]" }}
                                    startContent={<DollarSign size={18} className="text-default-400" />}
                                    isInvalid={!!errors.price}
                                    errorMessage={errors.price?.message}
                                />
                            )}
                        />

                        <Controller
                            name={"tenant"}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label={"Tenant"}
                                    labelPlacement={"outside"}
                                    placeholder={"Enter tenant name"}
                                    variant={"bordered"}
                                    classNames={{ inputWrapper: "border-[0.5px]" }}
                                    startContent={<User size={18} className="text-default-400" />}
                                    isInvalid={!!errors.tenant}
                                    errorMessage={errors.tenant?.message}
                                />
                            )}
                        />

                    </div>
                </RoomCard>

                <RoomCard title={"Location & Description"} icon={MapPin}>
                    <div className={"space-y-6"}>
                        <Controller
                            name={"address"}
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label={"Address"}
                                    labelPlacement={"outside"}
                                    placeholder={"Enter address"}
                                    variant={"bordered"}
                                    classNames={{ inputWrapper: "border-[0.5px]" }}
                                    startContent={<DollarSign size={18} className="text-default-400" />}
                                    isInvalid={!!errors.address}
                                    errorMessage={errors.address?.message}
                                />
                            )}
                        />

                        <Controller
                            name={"description"}
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    label="Description"
                                    labelPlacement="outside"
                                    placeholder="Enter room description..."
                                    variant="bordered"
                                    classNames={{ inputWrapper: "border-[0.5px]" }}
                                    minRows={4}
                                    maxRows={8}
                                    isInvalid={!!errors.description}
                                    errorMessage={errors.description?.message}
                                />
                            )}
                        />
                    </div>
                </RoomCard>

                <div className={"flex flex-col sm:flex-row gap-3 pt-4"}>
                    <Button
                        variant="bordered"
                        size="lg"
                        className="flex-1 border-[0.5px] border-gray-400"
                        onPress={handleCancel}
                    >
                        Cancel Changes
                    </Button>
                    <Button
                        className="bg-primary flex-1"
                        size="lg"
                        startContent={<Save size={18} />}
                        type={"submit"}
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    )
}