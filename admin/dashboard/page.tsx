import { Users, BarChart2, Eye, Activity } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-green-800">Admin Dashboard</h1>
      <p className="mb-8 text-xl text-gray-600">Welcome to the NSBS Elections admin dashboard. Here you can manage various aspects of the election system.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <DashboardCard
          title="Voter Management"
          description="Create and manage voter accounts."
          icon={<Users className="h-8 w-8 text-green-600" />}
          link="/admin/voters"
        />
        <DashboardCard
          title="Poll Management"
          description="Create, edit, and manage election polls."
          icon={<BarChart2 className="h-8 w-8 text-green-600" />}
          link="/admin/polls"
        />
        <DashboardCard
          title="Results Management"
          description="Control the visibility of election results."
          icon={<Eye className="h-8 w-8 text-green-600" />}
          link="/admin/results"
        />
      </div>
    </div>
  )
}

function DashboardCard({ title, description, icon, link }: { title: string, description: string, icon: React.ReactNode, link: string }) {
  return (
    <Link href={link} className="block">
      <div className="bg-white p-6 rounded-xl shadow-md transition duration-300 hover:shadow-lg">
        <div className="flex items-center mb-4">
          {icon}
          <h2 className="text-xl font-semibold ml-4 text-green-800">{title}</h2>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  )
}

