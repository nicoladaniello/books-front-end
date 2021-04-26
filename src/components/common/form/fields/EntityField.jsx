import React, { forwardRef, useCallback, useEffect, useState } from "react";
import apiService from "../../../../services/apiService";
import httpService from "../../../../services/httpService";
import Autocomplete from "../../Autocomplete";

/**
 * An autocomplete input field to select an entity from the server.
 * It's value will be the entity's self URL string.
 */
const EntityField = forwardRef(
  ({ value, optionLabel, onChange, ...props }, ref) => {
    const [entity, setEntity] = useState();

    // When the selected entity changes run onChange with the entity URL as argument.
    useEffect(() => {
      if (entity) onChange(entity);
    }, [entity, onChange]);

    /**
     * Load the selected entity from the given URL value.
     */
    const loadInitialValue = useCallback(async () => {
      // Stop executing if a value wasn't provided or it's already been fetched.
      if (!value || value === "" || entity) return;

      const { data } = await httpService.get(value);
      if (data) setEntity(data);
    }, [value, entity, setEntity]);

    useEffect(() => void loadInitialValue(), [loadInitialValue]);

    /**
     * Options loader.
     */
    const loadOptions = async (inputValue, callback) => {
      try {
        const capitalOptionLabel =
          optionLabel.charAt(0).toUpperCase() + optionLabel.slice(1);

        const { _embedded } = await apiService.searchByMethod({
          resource: "entitys",
          method: `findBy${capitalOptionLabel}ContainingIgnoreCase`,
          params: { [optionLabel]: inputValue },
        });
        callback(_embedded.entitys);
      } catch (ex) {
        alert("Errore: impossibile caricare fornitori.");
        console.error("Error while loading entitys.", ex);
      }
    };

    // UI
    return (
      <Autocomplete
        {...props}
        ref={ref}
        loadOptions={loadOptions}
        getOptionLabel={(entity) => entity[optionLabel]}
        getOptionValue={(entity) => entity.id}
        value={entity}
        onChange={setEntity}
      />
    );
  }
);

export default EntityField;
