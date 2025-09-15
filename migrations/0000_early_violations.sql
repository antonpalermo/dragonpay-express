CREATE TABLE "transactions" (
	"id" uuid DEFAULT gen_random_uuid(),
	"txnid" text NOT NULL,
	"refno" text NOT NULL,
	"dateCreated" timestamp DEFAULT now(),
	"dateUpdated" timestamp,
	CONSTRAINT "transactions_txnid_unique" UNIQUE("txnid"),
	CONSTRAINT "transactions_refno_unique" UNIQUE("refno")
);
--> statement-breakpoint
CREATE INDEX "txnid_index" ON "transactions" USING btree ("txnid");--> statement-breakpoint
CREATE INDEX "refno_index" ON "transactions" USING btree ("refno");