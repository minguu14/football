type Props = {
  id: string;
  label: string;
  options: string[];
  defaultValue: string | undefined;
};
export const SelectField: React.FC<Props> = ({
  id,
  label,
  options,
  ...props
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      id={id}
      name={id}
      className="mt-1 block w-full rounded-md border focus:border-orange-500 focus:ring-orange-500 p-1"
      {...props}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
