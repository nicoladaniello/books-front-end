import { PropTypes } from "prop-types";
import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SchemaField from "./fields/SchemaField";

const SchemaForm = ({
  schema,
  defaultValues,
  onSubmit,
  errors,
  children,
  ...props
}) => {
  const { t } = useTranslation();
  const { control, formState, handleSubmit, setError } = useForm({
    defaultValues,
  });
  const fields = getFields(schema);

  // Set errors
  useEffect(() => {
    if (errors)
      errors.forEach(({ property, message }) =>
        setError(property, { message })
      );
  }, [errors, setError]);

  // Function to render input fields
  const renderedFields = Object.keys(fields).map((key) => {
    let defaultValue = defaultValues[key] || null;

    // Set the value for all URI fields.
    // If the passed default values have a _links object
    // containing the named field, us it as field value.
    if (
      fields[key].format === "uri" &&
      !defaultValues[key] &&
      defaultValues?._links &&
      defaultValues?._links[key]
    )
      defaultValue = defaultValues?._links[key].href;

    return (
      <Controller
        {...props}
        key={key}
        name={key}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Form.Group>
            <Form.Label>{t(`common.${fields[key].title}`)}</Form.Label>
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

/**
 * Get the fields
 *
 * @param {*} schema
 * @returns
 */
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
  onSubmit: PropTypes.func,
  errors: PropTypes.array,
};

SchemaForm.defaultProps = {
  defaultValues: {},
};

export default SchemaForm;
