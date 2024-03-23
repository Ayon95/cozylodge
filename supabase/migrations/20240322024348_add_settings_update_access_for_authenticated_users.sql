create policy "Enable update access for matching authenticated users"
on "public"."settings"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check (true);