parseQueryString = (query) => {
  const vars = query.split("&");
  let queryString = {};

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    const key = decodeURIComponent(pair[0]);
    const value = decodeURIComponent(pair[1]);
    /* If first entry with this name */
    if (typeof queryString[key] === "undefined") {
      queryString[key] = decodeURIComponent(value);
      /* If second entry with this name */
    } else if (typeof queryString[key] === "string") {
      const arr = [queryString[key], decodeURIComponent(value)];
      queryString[key] = arr;
      /* If third or later entry with this name */
    } else {
      queryString[key].push(decodeURIComponent(value));
    }
  }

  return queryString;
};
