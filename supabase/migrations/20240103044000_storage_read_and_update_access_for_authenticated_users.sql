create policy "Enable read access for authenticated users only"
on "storage"."objects"
as permissive
for select
to authenticated
using (true);


create policy "Enable update access for authenticated users only"
on "storage"."objects"
as permissive
for update
to authenticated
using (true)
with check (true);