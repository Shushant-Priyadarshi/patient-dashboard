const AnalyticsCard = ({
  icon,
  title,
  data,
}: {
  icon: React.ReactNode;
  title: string;
  data: string;
}) => (
  <div className="bg-white rounded-xl p-4 shadow flex items-center gap-4">
    <div className="bg-red-100 text-red-600 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <h5 className="font-semibold text-lg text-gray-800">{data}</h5>
    </div>
  </div>
);

export default AnalyticsCard