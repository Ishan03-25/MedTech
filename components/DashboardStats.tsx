export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="text-slate-600 text-sm font-medium mb-4">Title Here</div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#eef2ff] grid place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 text-[#6366f1]"
            >
              <path
                fillRule="evenodd"
                d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM3.75 20.25a8.25 8.25 0 0116.5 0v.75H3.75v-.75z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-3xl font-extrabold tracking-tight text-[#0f172a]">
            145
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="text-slate-600 text-sm font-medium mb-4">Title Here</div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#eafff1] grid place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM3.75 20.25a8.25 8.25 0 0116.5 0v.75H3.75v-.75z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-3xl font-extrabold tracking-tight text-green-600">
            3,264
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="text-slate-600 text-sm font-medium mb-4">Title Here</div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#fff1e7] grid place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 text-orange-500"
            >
              <path
                fillRule="evenodd"
                d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM3.75 20.25a8.25 8.25 0 0116.5 0v.75H3.75v-.75z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-3xl font-extrabold tracking-tight text-orange-500">
            1244
          </div>
        </div>
      </div>
    </div>
  );
}
