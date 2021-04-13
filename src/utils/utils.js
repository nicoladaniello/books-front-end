export function flattenObject(object) {
  return Object.assign(
    {},
    ...Object.keys(object).map((key) => {
      console.log(object[key]);
      if (!object[key] || typeof object[key] !== "object")
        return { [key]: object[key] };

      return flattenObject(object[key]);
    })
  );
}
