"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

export const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext =
  React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
  );

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider
      value={{ name: props.name }}
    >
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

export const useFormField = () => {
  const fieldContext =
    React.useContext(FormFieldContext);

  const { getFieldState, formState } =
    useFormContext();

  const fieldState = getFieldState(
    fieldContext.name,
    formState
  );

  return {
    name: fieldContext.name,
    ...fieldState,
  };
};

export function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`space-y-2 ${className ?? ""}`}
      {...props}
    />
  );
}

export function FormLabel({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`text-sm font-medium ${className ?? ""}`}
      {...props}
    />
  );
}

export function FormControl({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export function FormDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm text-muted-foreground ${
        className ?? ""
      }`}
      {...props}
    />
  );
}

export function FormMessage() {
  const { error } = useFormField();

  if (!error) return null;

  return (
    <p className="text-sm font-medium text-destructive">
      {String(error.message)}
    </p>
  );
}