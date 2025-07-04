import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldValues } from "react-hook-form";
import { z } from "zod";

const CreateBook = () => {
  const formSchema = z.object({
    name: z.string().min(2).max(50),
  });
  const defaultValues = {
    name: "",
  };

  function onSubmit(values: FieldValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <h1>CreateBook</h1>

      <AppForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={zodResolver(formSchema)}
      >
        <AppInput name="name" label="name" />
        <Button type="submit">Submit</Button>
      </AppForm>
    </div>
  );
};

export default CreateBook;
