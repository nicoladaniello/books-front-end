import { PropTypes } from "prop-types";
import React from "react";
import { FormControl } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";

export const FieldTypes = Object.freeze({
  DATE: "date",
  SELECT: "select",
  TEXT: "text",
  EMAIL: "email",
  TEL: "tel",
  PASSWORD: "password",
  NUMBER: "number",
  HIDDEN: "hidden",
  CURRENCY: "currency",
  SUPPLIER: "supplier",
});

const FormField = ({ name, type, options, rules, defaultValue, ...props }) => {
  const { control, register } = useFormContext();

  const isSelect = type === FieldTypes.SELECT;
  const isCurrency = type === FieldTypes.CURRENCY;
  const isTel = type === FieldTypes.TEL;

  const telFormat = "#### #### #### ####";

  return isSelect ? (
    <FormControl
      {...props}
      ref={register(rules)}
      custom
      as="select"
      name={name}
    >
      {options &&
        Object.keys(options).map((key) => (
          <option key={key} value={key}>
            {options[key].label}
          </option>
        ))}
    </FormControl>
  ) : isCurrency || isTel ? (
    <Controller
      {...props}
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, ref, controllerProps } }) => (
        <NumberFormat
          {...controllerProps}
          ref={ref}
          customInput={FormControl}
          onValueChange={({ floatValue }) => onChange(floatValue)}
          thousandSeparator={isCurrency}
          prefix={!!isCurrency && process.env.LOCAL_CURRENCY_SYMBOL}
          format={isTel && telFormat}
        />
      )}
    />
  ) : (
    <FormControl
      {...props}
      ref={register(rules)}
      type={type}
      name={name}
      defaultValue={defaultValue}
    />
  );
};

FormField.propTypes = {
  type: PropTypes.string,
  options: PropTypes.object,
  rules: PropTypes.object,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

FormField.defaultProps = {
  type: "text",
  defaultValue: null,
};

export default FormField;
