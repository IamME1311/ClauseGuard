import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Bell className="w-7 h-7 text-yellow-600" />
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>
      <div className="rounded-xl bg-white shadow p-8 text-center text-gray-500 dark:bg-slate-900">
        <p>View alerts and notifications about your contracts and team activity.</p>
        <p className="mt-2 text-xs text-gray-400">(Connect to backend for real data)</p>
      </div>
    </div>
  );
}
