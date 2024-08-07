export const SelectField = ({ id, label, options, ...props }: any) => (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="mt-1 block w-full rounded-md border focus:border-orange-500 focus:ring-orange-500"
        {...props}
      >
        {options.map((option: any) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );