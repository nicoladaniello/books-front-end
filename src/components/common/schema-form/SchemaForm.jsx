import { PropTypes } from "prop-types";
import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import SchemaField from "./fields/SchemaField";

const SchemaForm = ({
  schema,
  defaultValues,
  onSubmit,
  errors,
  children,
  ...props
}) => {
  const { control, formState, handleSubmit, setError } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (errors)
      errors.forEach(({ property, message }) =>
        setError(property, { message })
      );
  }, [errors, setError]);

  const fields = getFields(schema);

  const renderedFields = Object.keys(fields).map((key) => {
    let defaultValue = defaultValues[key] || null;
    // if (key === "supplier" && !defaultValues[key]) defaultValue = { name: "" };
    return (
      <Controller
        {...props}
        key={key}
        name={key}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: {
            value: schema.required && schema.required.includes(key),
            message: "Questo campo è obbligatorio.",
          },
          min: {
            value: fields[key].minimum,
            message: `Il minimo richiesto è di ${fields[key].minimum}.`,
          },
          max: {
            value: fields[key].max,
            message: `Il massimo richiesto è di ${fields[key].max}.`,
          },
          minLength: {
            value: fields[key].minLength,
            message: `Inserisci almeno ${fields[key].minLength} caratteri.`,
          },
          maxLength: {
            value: fields[key].maxLength,
            message: `Massimi caratteri consentiti sono ${fields[key].maxLength}.`,
          },
          valueAsDate: {
            value:
              fields[key].format === "date" ||
              fields[key].format === "date-time",
            message: "Data invalida.",
          },
          valueAsNumber: {
            value: fields[key].type === "number",
            message: "Inserisci solo numeri.",
          },
        }}
        render={({ field }) => (
          <Form.Group>
            <Form.Label>{fields[key].title}</Form.Label>
            <SchemaField
              {...field}
              type={fields[key].type}
              format={fields[key].format}
              className={formState.errors[key] && "is-invalid"}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors[key] && formState.errors[key].message}
            </Form.Control.Feedback>
          </Form.Group>
        )}
      />
    );
  });

  return (
    <Form {...props} onSubmit={handleSubmit(onSubmit)}>
      {children ? children(renderedFields) : renderedFields}
    </Form>
  );
};

function getFields(schema) {
  return Object.assign(
    {},
    ...Object.keys(schema.properties).map((key) => {
      // readOnly fields won't appear in the form.
      if (schema.properties[key].readOnly) return null;

      if (schema.properties[key].type !== "object")
        return { [key]: schema.properties[key] };

      // Handle nested object
      if (schema.properties[key].properties) {
        return getFields(schema.properties[key]);
      }

      // Handle nested object with $ref
      if (schema.properties[key]["$ref"] && schema.properties[key]) {
        const fields = schema.properties[key]["$ref"].split("/");
        fields.shift(); // removes hash (#)
        const nestedSchema = fields.reduce((acc, curr) => acc[curr], schema);

        return getFields(nestedSchema);
      }
      return null;
    })
  );
}

SchemaForm.propTypes = {
  schema: PropTypes.object.isRequired,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.array,
};

SchemaForm.defaultProps = {
  defaultValues: {},
};

export default SchemaForm;
