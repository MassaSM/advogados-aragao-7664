import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * Leads capturados pelo formulário da landing page.
 * Aplicar com `bun run db:push` (a partir de packages/web).
 */
export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  area: text("area").notNull(),
  message: text("message").notNull(),
  source: text("source").notNull().default("landing"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type Lead = typeof leads.$inferSelect;
