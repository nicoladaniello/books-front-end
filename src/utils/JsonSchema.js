function JsonSchema(schema) {
  this.schema = schema;
  /**
   * Returns a flat version of a schema where each nested object
   * is at root level. Useful to show all headers of a schema.
   *
   * @param {object} _schema - The schema object.
   */
  const getFlattenProperties = (_schema) => {
    return Object.assign(
      {},
      ...Object.keys(_schema.properties).map((key) => {
        const property = _schema.properties[key];

        if (property.type !== "object") {
          return { [key]: property };
        }
        // Handle nested propertoies
        else {
          let nestedObject;

          if (property.properties) {
            return getFlatProperties(property);
          } else if (property["$ref"]) {
            const fields = property["$ref"].split("/");
            fields.shift(); // removes hash (#)

            try {
              // Extract schema definition from $ref URI string.
              nestedObject = fields.reduce((acc, curr) => acc[curr], _schema);
            } catch (ex) {
              console.error(ex);
              throw Error(
                "Error while finding property '$ref' in nested object with key: " +
                  key
              );
            }
            return getFlatProperties(nestedObject);
          } else
            throw Error(
              "Nested object with key '" +
                key +
                "' is missing a property named 'properties' or '$ref'."
            );
        }
      })
    );
  };

  this.getFlattenProperties = () => getFlattenProperties(this.schema);
}

export default JsonSchema;
