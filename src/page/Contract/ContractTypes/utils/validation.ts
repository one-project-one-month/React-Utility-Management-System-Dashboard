import z from "zod";

export const contractTypeValidationSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name should be at least 2 characters" }),
	duration: z.string().min(1, { message: "Duration is required" }),
	price: z.string().min(1, { message: "Price is required" }),
	facilities: z.array(z.string()).optional(),
});
