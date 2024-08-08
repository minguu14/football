type Props = {
  id: string;
  name: string;
  rows: number;
  label: string;
  defaultValue: string | undefined;
  required: boolean;
};
export const TextareaField: React.FC<Props> = ({
  id,
  name,
  rows,
  label,
  ...props
}) => {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        className="mt-1 block w-full rounded-md border focus:border-orange-500 focus:ring-orange-500 p-2"
        {...props}
      ></textarea>
    </>
  );
};
