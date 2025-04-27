import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  // If user is not authenticated, redirect to login
  if (!session) {
    redirect('/auth/login');
  }

  // Personalized greeting and assistant options
  return (
    <div className="dashboard-layout">
      <h1 className="text-2xl font-bold mb-4">What do you need today?</h1>
      <div className="flex gap-4 mb-8">
        <a href="/dashboard/legal-research" className="btn btn-primary">Legal Research Assistant</a>
        <a href="/dashboard/contract-intelligence" className="btn btn-primary">Contract Intelligence Assistant</a>
      </div>
      <div>{children}</div>
    </div>
  );
}
