import Link from 'next/link';

export default function MedicalStudentDashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medical Student Dashboard</h1>
      <p>Medical student dashboard content will be implemented here.</p>
      <div className="mt-4">
        <Link href="/" className="text-primary-600 hover:text-primary-700">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
