drop policy "Enable read access for all users" on "public"."booking";

drop policy "Enable read access for all users" on "public"."cabin";

drop policy "Enable read access for all users" on "public"."guest";

drop policy "Enable read access for all users" on "public"."settings";

create policy "Enable read access for authenticated users"
on "public"."booking"
as permissive
for select
to authenticated
using (true);


create policy "Enable read access for authenticated users"
on "public"."cabin"
as permissive
for select
to authenticated
using (true);


create policy "Enable read access for authenticated users"
on "public"."guest"
as permissive
for select
to authenticated
using (true);


create policy "Enable read access for authenticated users"
on "public"."settings"
as permissive
for select
to authenticated
using (true);