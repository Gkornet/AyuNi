import { requireAdmin } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side rol-check — redirect als geen admin/editor
  await requireAdmin()

  return (
    <div className="flex min-h-screen bg-cream-200">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
