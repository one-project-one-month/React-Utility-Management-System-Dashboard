import { z } from "zod";

export const roomSchema = z.object({
    id: z.uuid().optional(),
    roomNo: z.coerce.number({
        message: "Room number is required"
    }).min(1, "Room number must be at least 1"),
    floor: z.coerce.number({
        message: "Floor number is required"
    }).min(1, "Floor must be at least 1"),
    dimension: z.string().nonempty("Dimension is required"),
    noOfBedRoom: z.coerce.number({
        message: "Number of bedrooms is required"
    }).min(1, "Bedroom number must be at least 1"),
    status: z.enum(["available", "rented", "purchased", "maintenance"], { message: "Select room status" }),
    sellingPrice: z.coerce.number({
        message: "Price is required"
    }).min(1, "Price must be at least 0"),
    maxNoPeople: z.coerce.number({ message: "Maximum occupancy is required" }).min(1, "Minimum 1 person").max(10, "Maximum 10 people"),
    description: z.string().nonempty("Description is required"),
});

export const createRoomSchema = roomSchema.omit({ id: true });
export const editRoomSchema = roomSchema.omit({ id: true });

export type Room = z.infer<typeof roomSchema>;
export type CreateRoomFormData = z.infer<typeof editRoomSchema>;
export type EditRoomFormData = z.infer<typeof editRoomSchema>;