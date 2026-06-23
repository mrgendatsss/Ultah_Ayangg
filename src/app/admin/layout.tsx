import Link from "next/link";
import { Lock } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="flex items-center gap-2 text-gray-900 font-bold text-xl mb-8">
          <Lock className="w-5 h-5 text-indigo-600" />
          <span>Admin Portal</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/admin/wishes" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            Wishes & Uploads
          </Link>
          <Link href="/admin/settings" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            Site Settings
          </Link>
          <Link href="/" className="block px-4 py-2 mt-8 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors">
            &larr; Back to Main Site
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
