export default function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 transition-shadow hover:shadow-xl">
      {title && <h2 className="font-semibold text-xl text-gray-900 mb-4">{title}</h2>}
      <div className="text-gray-700">{children}</div>
    </div>
  );
}