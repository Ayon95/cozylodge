-- create users
insert into
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) (
        select
            '00000000-0000-0000-0000-000000000000',
            uuid_generate_v4 (),
            'authenticated',
            'authenticated',
            'user' || (ROW_NUMBER() OVER ()) || '@example.com',
            crypt ('pass123', gen_salt ('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            '{}',
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
        from
            generate_series(1, 3)
    );

-- user email identities
insert into
    auth.identities (
        id,
        user_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    ) (
        select
            uuid_generate_v4 (),
            id,
            format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
            'email',
            current_timestamp,
            current_timestamp,
            current_timestamp
        from
            auth.users
    );

do $$
<<first_block>>
declare
  user_id uuid := (select id from auth.users where email = 'user1@example.com');
begin
-- create cabins
  insert into
  public.cabin (name, max_capacity, regular_price, discount, description, image_url, user_id)
  values
  ('001', 2, 250, 50, 'A small luxury cabin in the woods', 'http://localhost:54321/storage/v1/object/public/cabin-images/cabin-001.jpg', user_id),
  ('002', 4, 500, 75, 'Comfortable cabin for a small family', 'http://localhost:54321/storage/v1/object/public/cabin-images/cabin-002.jpg', user_id);
end first_block $$;

