import React from "react";
import { Form as BSForm } from "react-bootstrap";
import { FormProvider } from "react-hook-form";
import FormField from "./FormField";

const Form = ({ methods, onSubmit, children, ...props }) => {
  return (
    <FormProvider {...methods}>
      <BSForm {...props} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </BSForm>
    </FormProvider>
  );
};

Form.Field = FormField;

export default Form;
