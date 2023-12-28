# CozyLodge

CozyLodge is a hotel-management web application that allows hotel owners to manage cabins/rooms, guests, bookings, review sales and analytics, and much more.

## Technologies used

Frontend:

- React
- TypeScript
- Styled components
- React Query
- React Router
- React Hook Form

Backend:

- Supabase
- Supabase Auth
- Supabase Storage

Testing:

- Vitest
- React Testing Library
- Cypress
- Mock Service Worker

## Running the project locally

Clone the repository and install project dependencies.

```bash
git clone https://github.com/Ayon95/cozylodge.git
cd cozylodge
npm install
```

### Supabase local development

Docker is required to run Supabase locally, so make sure that Docker is installed and running.

How to run Supabase locally - [https://supabase.com/docs/guides/cli/local-development](https://supabase.com/docs/guides/cli/local-development)

View the status of your local Supabase setup:

```bash
npx supabase status
```

### Environment variables

Create `.env.development` and `.env.test` files in the root directory.

In `.env.development`:

```bash
VITE_SUPABASE_URL='Your Supabase local development URL here'
VITE_SUPABASE_KEY='Your Supabase local development Anon key here'

```

In `.env.test`:

```bash
VITE_SUPABASE_URL='http://test.com'
VITE_SUPABASE_KEY='test'

```

### Cypress environment variables

Create `cypress.env.json` and `development.secrets` in the root directory. Login credentials for the test user are based on the user created by running `supabase/seed.sql` file.

In `cypress.env.json`:

```json
{
	"user_email": "user1@example.com",
	"user_password": "pass123"
}
```

In `development.secrets`:

```bash
VITE_SUPABASE_KEY='Your Supabase local development Anon key here'
CYPRESS_USER_EMAIL='user1@example.com'
CYPRESS_USER_PASSWORD='pass123'
```

### Create storage buckets

You can access local Supabase dashboard by visiting the Supabase studio URL. Go to `Storage` and create `cabin-images` and `avatars` public storage buckets. Upload `cabin-001.jpg` and `cabin-002.jpg` to `cabin-images`. You can find the images in `src/assets/seedImages`.

### NPM scripts

```bash
# start development server
npm run dev

# run unit and integration tests
npm run test

# run Cypress tests
npm run cypress:run

# open Cypress app in your browser
npm run cypress:open

# create production build
npm run build

# run ESLint
npm run lint

# run Prettier in check mode (only check for formatting errors)
npm run prettier:check

# run Prettier in format mode (check for formatting errors and make necessary changes)
npm run prettier:format

# output changes made to the database
npm run supabase:diff

# generate TypeScript types for the database
npm run supabase:types
```
