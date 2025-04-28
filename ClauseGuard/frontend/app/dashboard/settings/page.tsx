'use client';
import { Settings } from "lucide-react";
import { useUser } from "../../../context/UserContext";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { user, accessToken, loading: userLoading } = useUser();
  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !accessToken) return;
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        // Replace with your backend endpoint for user profile if available
        const res = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
        setName(data.name || "");
        setAvatar(data.avatar || "");
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    if (user && accessToken) fetchProfile();
  }, [user, accessToken]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      // Replace with your backend endpoint for updating user profile
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name, avatar }),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      setSuccess("Profile updated successfully!");
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (userLoading || loading) return <div className="p-8 text-center text-gray-400">Loading profile...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Settings className="w-7 h-7 text-gray-600" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      <div className="rounded-xl bg-white shadow p-8 dark:bg-slate-900">
        <h2 className="text-lg font-semibold mb-4">User Profile</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-4 items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center text-3xl font-bold text-blue-900">
              {avatar ? <img src={avatar} alt="avatar" className="rounded-full w-16 h-16 object-cover" /> : (user?.email?.[0]?.toUpperCase() || "U")}
            </div>
            <label htmlFor="avatar" className="sr-only">Avatar URL</label>
            <input
              id="avatar"
              type="url"
              placeholder="Avatar URL"
              title="Avatar URL"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
              className="mt-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring w-full"
            />
          </div>
          <div className="w-full">
            <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              title="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring w-full"
            />
          </div>
          <div className="w-full">
            <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              title="Your email"
              value={user?.email || ""}
              disabled
              className="mt-1 px-3 py-2 rounded border border-gray-200 bg-gray-100 text-gray-400 w-full cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          {success && <div className="text-green-600 font-semibold">{success}</div>}
        </form>
      </div>
      <div className="rounded-xl bg-white shadow p-8 text-center text-gray-500 dark:bg-slate-900 mt-8">
        <p>Manage your account, preferences, and application settings.</p>
        <p className="mt-2 text-xs text-gray-400">(Connect to backend for real data)</p>
      </div>
    </div>
  );
}
