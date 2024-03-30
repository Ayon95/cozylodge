create policy "Enable update access for matching authenticated users"
on "public"."booking"
as permissive
for update
to authenticated
using ((auth.uid() = user_id));