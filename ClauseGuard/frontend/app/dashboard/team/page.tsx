import { Users } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Users className="w-7 h-7 text-indigo-600" />
        <h1 className="text-2xl font-bold">Team</h1>
      </div>
      <div className="rounded-xl bg-white shadow p-8 text-center text-gray-500 dark:bg-slate-900">
        <p>Manage your team, assign roles, and collaborate securely.</p>
        <p className="mt-2 text-xs text-gray-400">(Connect to backend for real data)</p>
      </div>
    </div>
  );
}
