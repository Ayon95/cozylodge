create policy "Enable insert for matching authenticated users"
on "public"."cabin"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));

create policy "Enable insert for authenticated users only"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (true);