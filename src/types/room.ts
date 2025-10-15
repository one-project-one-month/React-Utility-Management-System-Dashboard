import { z } from "zod";

export const roomSchema = z.object({
    id: z.uuid().optional(),
    roomNo: z.coerce.number().int().positive(),
    floor: z.coerce.number().min(1).max(10),
    dimension: z.string().min(1, "Dimension is required"),
    noOfBedRoom: z.coerce.number().min(1).max(5),
    // noOfBathroom: z.coerce.number().min(1).max(5),
    status: z.enum(["available", "rented", "purchased", "maintenance"]),
    sellingPrice: z.coerce.number().min(1, "Price is required"),
    maxNoPeople: z.coerce.number().min(1, "Maximum occupancy is required"),
    description: z.string().min(1, "Description is required"),
});

export const editRoomSchema = roomSchema.omit({ id: true });

export type Room = z.infer<typeof roomSchema>;
export type EditRoomFormData = z.infer<typeof editRoomSchema>;