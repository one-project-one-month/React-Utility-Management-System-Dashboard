import { FormSelect } from "@/components/Form/form-select";
import { serviceRequestMockData } from "@/constants/customerServiceMockData";
import { customerServiceEditSchema, type CustomerServiceEditFormData } from "@/schemas/customerServiceSchema";
import { Button, Card, CardBody } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Activity, AlertTriangle, FolderCog, Save } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router"

const CATEGORY_OPTIONS = [
    { key: "Complain", label: "Complain" },
    { key: "Maintenance", label: "Maintenance" },
    { key: "Others", label: "Others" }
];

const STATUS_OPTIONS = [
    { key: "Pending", label: "Pending", },
    { key: "Ongoing", label: "Ongoing", },
    { key: "Resolved", label: "Resolved" }
];

const PRIORITY_OPTIONS = [
    { key: "Low", label: "Low", },
    { key: "Medium", label: "Medium", },
    { key: "High", label: "High" }
];

export default function CustomerServiceEditPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    // get service by ID api
    const service = serviceRequestMockData.find((singleReq) => singleReq.id === id)

    const { control, handleSubmit, formState: { errors } } = useForm<CustomerServiceEditFormData>({
        resolver: zodResolver(customerServiceEditSchema),
        defaultValues: {
            category: service?.category,
            status: service?.status,
            priority: service?.priority
        }
    })

    const onSubmit = (data: CustomerServiceEditFormData) => {
        console.log('submit data', data)
    }

    if (!service) {
        return (
            <div className="p-8">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold mb-4">Room Not Found</h1>
                    <Button onPress={() => navigate('/customer-service')}>
                        Back to Rooms
                    </Button>
                </div>
            </div>
        )
    }

    const handleCancel = () => {
        navigate(`/customer-service`)
    }

    return (
        <div className="h-[84vh] p-8 space-y-4 overflow-y-auto custom-scrollbar">
            <div>
                <div className="flex justify-between">
                    <h1 className={"text-2xl font-semibold"}>Edit Service of {service.roomNo}</h1>
                    <div className="text-2xl font-semibold">
                        {/* ISSUED DATE */}
                        {service.issuedDate}
                    </div>
                </div>
                    <p className={"text-sm text-default-500 mt-1"}>Update service information</p>
                
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=" bg-gray-200/20 rounded-2xl p-4 md:p-7 space-y-6">
                <Card className="rounded-3xl shadow-none">
                    <CardBody className="p-6 space-y-6">
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <FormSelect
                                    label={"Category"}
                                    options={CATEGORY_OPTIONS}
                                    value={field.value}
                                    onChange={field.onChange}
                                    startContent={<FolderCog size={18} className={"text-default-400"} />}
                                    isInvalid={!!errors.category}
                                    errorMessage={errors.category?.message}
                                />
                            )}
                        />
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <FormSelect
                                    label={"Status"}
                                    options={STATUS_OPTIONS}
                                    value={field.value}
                                    onChange={field.onChange}
                                    startContent={<Activity size={18} className={"text-default-400"} />}
                                    isInvalid={!!errors.status}
                                    errorMessage={errors.status?.message}
                                />
                            )}
                        />
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <FormSelect
                                    label={"Priority"}
                                    options={PRIORITY_OPTIONS}
                                    value={field.value}
                                    onChange={field.onChange}
                                    startContent={<AlertTriangle size={18} className={"text-default-400"} />}
                                    isInvalid={!!errors.priority}
                                    errorMessage={errors.priority?.message}
                                />
                            )}
                        />
                    </CardBody>
                </Card>
                <div className="flex flex-col md:flex-row gap-3 pt-4">
                    <Button
                        variant="bordered"
                        size="lg"
                        className="flex-1 border-[0.5px] border-gray-400 py-2 md:py-6"
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