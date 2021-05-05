import React, { forwardRef } from "react";
import AsyncSelect from "react-select/async";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    return (
      <AsyncSelect
        placeholder={`${t("common.select")}...`}
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
