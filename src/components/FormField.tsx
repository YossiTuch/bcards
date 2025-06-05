import { FloatingLabel, HelperText } from "flowbite-react";
import { UseFormRegister } from "react-hook-form";

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  path: string;
  error?: any;
  register: UseFormRegister<any>;
};

export const FormField = ({
  id,
  label,
  type = "text",
  path,
  error,
  register,
}: FormFieldProps) => (
  <div className="flex w-full flex-col">
    <FloatingLabel
      className="w-full rounded-md"
      id={id}
      variant="filled"
      label={label}
      type={type}
      {...register(path)}
      color={error ? "error" : "default"}
    />
    <HelperText className="w-full text-left" color="failure">
      {error?.message}
    </HelperText>
  </div>
);
