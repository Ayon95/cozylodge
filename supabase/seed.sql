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

-- create storage buckets for cabin images and user avatars
insert into storage.buckets(id, name, owner, public, avif_autodetection)
values
('cabin-images', 'cabin-images', null, true, false),
('avatars', 'avatars', null, true, false);

do $$
<<first_block>>
declare
  user_id uuid := (select id from auth.users where email = 'user1@example.com');
begin
-- create settings
insert into
public.settings (min_booking_length, max_booking_length, max_guests_per_booking, breakfast_price, user_id)
values
(1, 30, 8, 15, user_id)
-- create cabins
  insert into
  public.cabin (name, max_capacity, regular_price, discount, description, image_url, user_id)
  values
  ('001', 2, 250, 50, 'A small luxury cabin in the woods', 'http://localhost:54321/storage/v1/object/public/cabin-images/cabin-001.jpg', user_id),
  ('002', 4, 500, 75, 'Comfortable cabin for a small family', 'http://localhost:54321/storage/v1/object/public/cabin-images/cabin-002.jpg', user_id);
-- create guests
    insert into
    public.guest (full_name, email, nationality, user_id)
    values
    ('John Doe', 'john12@example.com', 'Canada', user_id),
    ('Mary Smith', 'mary34@example.com', 'Canada', user_id);
-- create bookings
    insert into
    public.booking (start_date, end_date, num_nights, num_guests, cabin_price, extra_price, total_price, status, cabin_id, guest_id, user_id, has_breakfast, is_paid)
    values
    ('2024-02-20 18:42:34', '2024-02-22 18:42:39', 2, 2, 250, 50, 300, 'checked-out', 1, 1, user_id, true, true),
    ('2024-02-20 18:42:34', '2024-02-24 18:42:39', 4, 4, 500, 100, 600, 'checked-out', 2, 2, user_id, true, true);
end first_block $$;



