import { pgTable, text, timestamp, uuid, index } from "drizzle-orm/pg-core";

export const transactions = pgTable(
  "transactions",
  {
    id: uuid().defaultRandom(),
    txnid: text().unique().notNull(),
    refno: text().unique().notNull(),
    status: text().notNull(),
    dateCreated: timestamp().defaultNow(),
    dateUpdated: timestamp().$onUpdate(() => new Date())
  },
  table => [
    index("txnid_index").on(table.txnid),
    index("refno_index").on(table.refno)
  ]
);
