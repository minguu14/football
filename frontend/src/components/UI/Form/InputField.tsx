type Props = {
  id: string;
  label?: string;
  type?: string;
  defaultValue: string | undefined;
  required: boolean;
  readOnly?: boolean;
  placeholder?: string;
  inputClassName?: string;
};

export const InputField: React.FC<Props> = ({
  id,
  label,
  type = "text",
  ...props
}: Props) => (
  <>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      className="mt-1 block w-full rounded-md border p-2 focus:border-orange-500 focus:ring-orange-500"
      {...props}
    />
  </>
);
