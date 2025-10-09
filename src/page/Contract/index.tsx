import { useForm, Controller } from "react-hook-form"
import { Form, Input, Divider, Select, SelectItem } from "@heroui/react";

type FormValues = {
    name: string;
    duration: string;
    price: string;
    facilities?: string[];
};

export default function BillingPage() {
    const { control, handleSubmit, register, formState: { errors } } = useForm<FormValues>({
        defaultValues: { duration: "monthly" }
    });

    const onSubmit = (data: FormValues) => {
        console.log("Success", data);
    }

    const options = [
        { key: '3 Months', label: '3 Months' },
        { key: '6 Months', label: '6 Months' },
        { key: '1 Years', label: '1 Years' },
        { key: '2 Years', label: '2 Years' },
    ];


    return (
        <section  >
            <h1 className="text-2xl">Create New Contract</h1>

            <Divider style={{ marginBlock: "1rem" }} />

            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* <Input type="text" {...register("name", { required: true })} label="Contract Name" placeholder="Enter contract Name" className="shadow-2xl border-[0.01px] rounded-xl" /> */}


                <Controller
                    {...register("name", { required: true })}
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            label="Name"
                            placeholder="Enter your username"
                            errorMessage={errors.name?.message}
                            isInvalid={!!errors.name}
                        />
                    )}
                />
                {errors.name && <span className="text-red-500">This field is required</span>}

                <Controller
                    {...register("duration", { required: true })}
                    name="duration"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Select className="max-w-xs" label="Select Duration" value={value} onChange={onChange}>
                            {options.map((option) => (
                                <SelectItem key={option.key}>{option.label}</SelectItem>
                            ))}
                        </Select>
                    )}
                />


                {errors.duration && <span className="text-red-500">{(errors.duration)?.message ?? 'Required'}</span>}

                <Controller
                    {...register("price", { required: true, })}
                    name="price"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            label="Price"
                            placeholder="Enter Price"
                            errorMessage={errors.name?.message}
                            isInvalid={!!errors.name}
                        />
                    )}
                />
                {errors.price && <span className="text-red-500">This field is required</span>}
                {/* 
                <Input type="text" {...register("price", { required: true, pattern: /^[0-9]+$/ })} label="Price" className="border-[0.01px] shadow-2xl rounded-xl" /> */}


                <Input type="submit" value={"Create"} className="shadow-2xl" />

            </Form>
        </section>
    )
}
