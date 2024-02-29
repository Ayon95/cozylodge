alter table "public"."booking" drop column "extras_price";

alter table "public"."booking" add column "extra_price" real not null;