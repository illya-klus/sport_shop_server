import { z } from "zod";

export const createOrderSchema = z.object({
  fullName: z.string().min(1),
  town: z.string().min(1),
  viddilennya: z.number().optional(),
  number: z.string().min(5),
  currency: z.string().default("USD"),
  deliveryType: z.enum(["NovaPoshta", "Courier", "Pickup"]),
});