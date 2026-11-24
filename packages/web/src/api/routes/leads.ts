import { z } from "zod";
import { desc } from "drizzle-orm";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";

const leadInput = z.object({
  name: z.string().trim().min(3, "Informe seu nome completo").max(120),
  email: z.string().trim().email("E-mail inválido").max(160),
  phone: z.string().trim().min(10, "Telefone inválido").max(30),
  area: z.string().trim().min(2).max(80),
  message: z.string().trim().min(10, "Descreva brevemente o caso").max(4000),
});

export const leads = {
  create: base.input(leadInput).handler(async ({ input }) => {
    const [lead] = await db
      .insert(schema.leads)
      .values({ ...input, source: "landing" })
      .returning();
    return lead;
  }),
  list: base.handler(() =>
    db.select().from(schema.leads).orderBy(desc(schema.leads.createdAt)).limit(200),
  ),
};
