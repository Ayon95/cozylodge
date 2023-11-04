ALTER TABLE "public"."booking"
  ADD COLUMN "user_id" uuid NOT NULL;

ALTER TABLE "public"."booking"
  ADD CONSTRAINT "booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users" ("id") ON DELETE CASCADE;

ALTER TABLE "public"."cabin"
  ADD COLUMN "user_id" uuid NOT NULL;

ALTER TABLE "public"."cabin"
  ADD CONSTRAINT "cabin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users" ("id") ON DELETE CASCADE;

ALTER TABLE "public"."guest"
  ADD COLUMN "user_id" uuid NOT NULL;

ALTER TABLE "public"."guest"
  ADD CONSTRAINT "guest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users" ("id") ON DELETE CASCADE;

ALTER TABLE "public"."settings"
  ADD COLUMN "user_id" uuid NOT NULL;

ALTER TABLE "public"."settings"
  ADD CONSTRAINT "settings_user_id_key" UNIQUE ("user_id");

ALTER TABLE "public"."settings"
  ADD CONSTRAINT "settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users" ("id") ON DELETE CASCADE;