import { z } from "zod";

export enum RoomAvailability {
   AVAILABLE = "Available",
   RENTED = "Rented",
   Purchased = "Purchased",
   MAINTENANCE = "InMaintenance",
}

const tenantSchema = z.object({
   id: z.uuid(),
   name: z.string(),
   email: z.email(),
   nrc: z.string(),
   phoneNo: z.string(),
   emergencyNo: z.string(),
   createdAt: z.date(),
   updatedAt: z.date(),
   roomId: z.uuid(),
});

const billSchema = z.object({
   id: z.uuid(),
   rentalFee: z.string(),
   electricityFee: z.string(),
   waterFee: z.string(),
   fineFee: z.string().nullable(),
   serviceFee: z.string(),
   groundFee: z.string(),
   carParkingFee: z.string().nullable(),
   wifiFee: z.string(),
   totalAmount: z.string(),
   dueDate: z.string(),
   createdAt: z.date(),
   updatedAt: z.date(),
   roomId: z.uuid(),
});

const customerServiceSchema = z.object({
   id: z.uuid(),
   description: z.string(),
   category: z.string(),
   status: z.string(),
   priorityLevel: z.string(),
   issuedDate: z.string(),
   createdAt: z.date(),
   updatedAt: z.date(),
   roomId: z.uuid(),
});

const contractSchema = z.object({
   id: z.uuid(),
   contractTypeId: z.uuid(),
   roomId: z.uuid(),
   tenantId: z.uuid(),
   createdDate: z.string(),
   updatedDate: z.string(),
   expiryDate: z.string(),
});

const roomSchema = z.object({
   id: z.uuid(),
   roomNo: z.coerce
      .number({
         message: "Room number is required",
      })
      .min(1, "Room number must be at least 1"),
   floor: z.coerce
      .number({
         message: "Floor number is required",
      })
      .min(1, "Floor must be at least 1"),
   dimension: z.string().nonempty("Dimension is required"),
   noOfBedRoom: z.coerce
      .number({
         message: "Number of bedrooms is required",
      })
      .min(1, "Bedroom number must be at least 1"),
   status: z.enum(Object.values(RoomAvailability) as [string, ...string[]]),
   sellingPrice: z.coerce
      .number({
         message: "Price is required",
      })
      .min(1, "Price must be at least 0"),
   maxNoOfPeople: z.coerce
      .number({ message: "Maximum occupancy is required" })
      .min(1, "Minimum 1 person")
      .max(10, "Maximum 10 people"),
   description: z.string().nonempty("Description is required"),
   createdAt: z.date().optional(),
   updatedAt: z.date().optional(),
   tenant: tenantSchema.nullable(),
   bill: z.array(billSchema),
   customerService: z.array(customerServiceSchema),
   contract: z.array(contractSchema),
});

export const createRoomSchema = roomSchema
   .omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      tenant: true,
      bill: true,
      customerService: true,
      contract: true,
   })
   .extend({
      status: z.enum(["Available"]).default("Available"),
   });

export const editRoomSchema = roomSchema.omit({
   id: true,
   createdAt: true,
   updatedAt: true,
   tenant: true,
   bill: true,
   customerService: true,
   contract: true,
});

export type Tenant = z.infer<typeof tenantSchema>;
export type Bill = z.infer<typeof billSchema>;
export type CustomerService = z.infer<typeof customerServiceSchema>;
export type Contract = z.infer<typeof contractSchema>;

export type Room = z.infer<typeof roomSchema>;
export type CreateRoomFormData = z.infer<typeof createRoomSchema>;
export type EditRoomFormData = z.infer<typeof editRoomSchema>;
