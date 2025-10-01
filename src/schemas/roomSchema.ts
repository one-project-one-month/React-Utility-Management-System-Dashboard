import {z} from "zod";

export const roomEditSchema = z.object({
    roomNo: z.string().min(1, "Room number is required"),
    bedrooms: z.string().min(1, "Number of bedrooms is required"),
    bathrooms: z.string().min(1, "Number of bathrooms is required"),
    floor: z.string().min(1, "Floor is required"),
    dimension: z.string().min(1, "Dimension is required"),
    status: z.string().min(1, "Status is required"),
    maxNoPeople: z.string().min(1, "Maximum occupancy is required"),
    price: z.string().min(1, "Monthly rate is required"),
    tenant: z.string().optional(),
    address: z.string().min(1, "Address is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

export type RoomEditFormData = z.infer<typeof roomEditSchema>;