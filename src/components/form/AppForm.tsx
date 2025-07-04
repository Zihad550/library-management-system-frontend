import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type Resolver,
  type SubmitHandler,
  type UseFormProps,
} from "react-hook-form";
import { Form } from "../ui/form";

interface IFormProps {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  defaultValues?: UseFormProps["defaultValues"];
  resolver?: Resolver<any, any, any>;
}
const AppForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: IFormProps) => {
  const formConfig: UseFormProps = {};
  if (defaultValues) formConfig["defaultValues"] = defaultValues;
  if (resolver) formConfig["resolver"] = resolver;
  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    reset();
  };
  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={handleSubmit(submit)}>{children}</form>
      </Form>
    </FormProvider>
  );
};

export default AppForm;
