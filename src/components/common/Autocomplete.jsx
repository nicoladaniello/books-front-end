import React, { forwardRef } from "react";
import AsyncSelect from "react-select/async";
import classnames from "classnames";

const Autocomplete = forwardRef(
  (
    {
      onChange,
      loadOptions,
      getOptionLabel,
      isClearable = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <AsyncSelect
        {...props}
        ref={ref}
        className={classnames(className, "w-100")}
        cacheOptions
        defaultOptions
        onChange={onChange}
        loadOptions={loadOptions}
        getOptionLabel={getOptionLabel}
        isClearable
      />
    );
  }
);

export default Autocomplete;