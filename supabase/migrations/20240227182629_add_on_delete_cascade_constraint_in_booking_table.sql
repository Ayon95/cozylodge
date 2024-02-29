alter table "public"."booking" drop constraint "booking_cabin_id_fkey";

alter table "public"."booking" drop constraint "booking_guest_id_fkey";

alter table "public"."booking" add constraint "booking_cabin_id_fkey" FOREIGN KEY (cabin_id) REFERENCES cabin(id) ON DELETE CASCADE not valid;

alter table "public"."booking" validate constraint "booking_cabin_id_fkey";

alter table "public"."booking" add constraint "booking_guest_id_fkey" FOREIGN KEY (guest_id) REFERENCES guest(id) ON DELETE CASCADE not valid;

alter table "public"."booking" validate constraint "booking_guest_id_fkey";