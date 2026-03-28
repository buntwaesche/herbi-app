const statusColors: Record<string, string> = {
  'bestätigt': 'bg-green-100 text-green-800',
  'angefragt': 'bg-yellow-100 text-yellow-800',
  'abgesagt': 'bg-red-100 text-red-800',
}

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  )
}
