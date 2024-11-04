function createFilters(obj) {
  const { limit, offset, ...where } = obj;

  if (!limit || limit > 20 || limit < 0) obj.limit = 20;
  if (!offset) obj.offset = 0;

  const filters = {
    limit: obj.limit,
    offset: obj.offset,
    where,
  };
  return filters;
}
export default createFilters;
