# ClauseGuard Frontend

This is the frontend for the ClauseGuard project, built with Next.js, Tailwind CSS, and Supabase for authentication.

## Features

- Modern, responsive UI with mobile support
- Authentication (email/password, Google, GitHub, forgot password)
- Secure, robust form validation and error handling
- Accessible, consistent design
- Performance optimized for production

## Getting Started

### 1. Prerequisites

- Node.js v18+
- npm, pnpm, or yarn
- Supabase project (get your keys from the [Supabase dashboard](https://app.supabase.com/))

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**Never commit your .env.local file to version control.**

### 3. Install Dependencies

```bash
npm install
```

Or use `pnpm install` or `yarn install`.

### 4. Run Locally

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

## Deployment

- Recommended: Deploy on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
- Set your environment variables in the deployment dashboard.
- Add your deployed domain as an OAuth redirect URL in your Supabase project for Google/GitHub login.

## Supabase Auth

- Email/password sign up and login
- Forgot password (reset via email)
- Social login (Google, GitHub)
- All flows require correct redirect URLs set in Supabase dashboard

## Performance

- Uses Next.js best practices
- Lazy loading for heavy sections recommended
- Use Next.js `<Image />` for optimized images

## Security & Production

- All secrets are kept in .env.local (never commit this file)
- Error boundaries and user feedback for all auth flows
- Lint and test before deploying: `npm run lint`

## Customization

- Edit `app/sections`, `app/components`, and `styles/` for your branding

---

For more info, see [Next.js](https://nextjs.org/docs) and [Supabase](https://supabase.com/docs) docs.
