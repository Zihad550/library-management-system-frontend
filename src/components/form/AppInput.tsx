import type { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface IAppInputProps {
  name: string;
  label: string;
  description?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
}
const AppInput = ({
  name,
  label,
  description,
  type = "text",
}: IAppInputProps) => {
  const method = useFormContext();
  return (
    <FormField
      control={method.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={label} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AppInput;
