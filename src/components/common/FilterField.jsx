import React from "react";
import { Badge, Button, Form, InputGroup } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import search from "../../settings/search";
import Filter from "../../utils/Filter";
import SchemaField from "./schema-form/fields/SchemaField";

const FilterField = (schema, filters, addFilter, removeFilter) => {
  const fields = getFields(schema);

  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: { field: Object.keys(fields)[0], value: null },
  });
  const watchField = watch("field");

  const handleAddFilter = ({ field, operation, value }) => {
    addFilter(new Filter(field, operation, value));
  };

  /**
   * UI
   */
  return (
    <>
      <Form onSubmit={handleSubmit(handleAddFilter)}>
        <InputGroup className="mx-auto">
          <InputGroup.Prepend>
            <InputGroup>
              <Form.Control
                {...register("field")}
                custom
                as="select"
                name="field"
              >
                {Object.keys(fields).map((key) => (
                  <option key={key} value={key}>
                    {fields[key].title}
                  </option>
                ))}
              </Form.Control>
              <Form.Control
                {...register("operation")}
                custom
                as="select"
                name="operation"
              >
                {Object.keys(search.operations).map((key) => (
                  <option key={key} value={key}>
                    {search.operations[key].label}
                  </option>
                ))}
              </Form.Control>
            </InputGroup>
          </InputGroup.Prepend>
          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <SchemaField
                {...field}
                type={fields[watchField]?.type}
                format={fields[watchField]?.format}
              />
            )}
          />
          <Button variant="secondary" type="submit">
            Filtra
          </Button>
        </InputGroup>
      </Form>
      {filters && (
        <div className="mt-2">
          {filters.map(({ field, operation, value }, idx) => (
            <Badge
              as="button"
              pill
              variant="dark"
              key={value + idx}
              className="rounded-pill border-0 m-1"
              onClick={() => removeFilter(filters[idx])}
            >
              {fields[field]?.title} {search.operations[operation]?.label} "
              {value}"<span className="ml-2 p-0">&times;</span>
            </Badge>
          ))}
        </div>
      )}
    </>
  );
};

function getFields(schema) {
  return Object.assign(
    {},
    ...Object.keys(schema.properties).map((key) => {
      // WriteOnly fields won't appear in the table
      if (schema.properties[key].writeOnly) return null;

      if (schema.properties[key].type !== "object")
        return { [key]: schema.properties[key] };

      // Handle nested object
      if (schema.properties[key].properties) {
        return getFields(schema.properties[key]);
      }

      if (schema.properties[key]["$ref"]) {
        const fields = schema.properties[key]["$ref"].split("/");
        fields.shift(); // removes hash (#)
        const nestedSchema = fields.reduce((acc, curr) => acc[curr], schema);

        return getFields(nestedSchema);
      }
      return null;
    })
  );
}

export default FilterField;
