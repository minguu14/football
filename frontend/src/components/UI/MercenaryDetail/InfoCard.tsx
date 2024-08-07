type Props = {
  label: string;
  value: string;
};

export const InfoCard = ({ label, value }: Props) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
    <p className="font-semibold text-gray-700">{label}</p>
    <p className="text-lg text-gray-800">{value}</p>
  </div>
);
