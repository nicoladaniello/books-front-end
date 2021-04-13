class Filter {
  constructor(field, operation, value) {
    this.field = field;
    this.operation = operation;
    this.value = value;
  }

  equals(other) {
    return (
      other instanceof Filter &&
      this.field === other.field &&
      this.operation === other.operation &&
      this.value === other.value
    );
  }

  apply(object) {
    switch (this.operation) {
      case "like":
        return ("" + object[this.field])
          .toLowerCase()
          .includes(("" + this.value).toLowerCase());

      case "equals":
        return object[this.field] === this.value;

      case "greater":
        return object[this.field] > this.value;

      case "lesser":
        return object[this.field] < this.value;

      default:
        return false;
    }
  }
}

export default Filter;
