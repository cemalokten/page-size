export function add_other_sizes(size: Number, OTHER_SIZES: Set<Number>) {
  if (typeof size === "number") {
    OTHER_SIZES.add(size);
  } else {
    return new Error("Size needs to be a number");
  }
}
