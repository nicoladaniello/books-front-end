import React, { forwardRef, useEffect, useState } from "react";
import httpService from "../../../../services/httpService";
import Autocomplete from "../../Autocomplete";

/**
 * Input field with autocompletion for an entity.
 * Returns the URL of the selected entity as value.
 */
const EntityUrlField = forwardRef(
  (
    { getOptionLabel, getOptionValue, loadOptions, value, onChange, ...props },
    ref
  ) => {
    // Store the selected entity
    const [entity, setEntity] = useState();

    // Pass the selected entity URL to onChange.
    useEffect(() => void onChange(entity?._links?.self?.href), [
      entity,
      onChange,
    ]);

    // If a default value is provided use it to fetch the entity.
    useEffect(() => {
      if (!value || entity) return;

      const fetch = async () => {
        try {
          const { data } = await httpService.get(value);
          setEntity(data);
        } catch (error) {
          console.error("Error while loading initial value.", error);
        }
      };

      fetch();
    }, [value, entity]);

    return (
      <Autocomplete
        {...props}
        ref={ref}
        value={entity}
        loadOptions={loadOptions}
        getOptionLabel={getOptionLabel}
        getOptionValue={(entity) => entity._links.self.href}
        onChange={setEntity}
      />
    );
  }
);

export default EntityUrlField;
