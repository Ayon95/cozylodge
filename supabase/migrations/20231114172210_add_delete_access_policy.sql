create policy "Enable delete access for matching authenticated users"
on "public"."cabin"
as permissive
for delete
to authenticated
using (auth.uid() = user_id);