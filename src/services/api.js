export const fetchProperties = async (limit = 50) => {
  const res = await fetch(`https://mira-strapi-dev.q.starberry.com/api/properties?_limit=${limit}`);
  if (!res.ok) throw new Error('Network response was not ok');
  const json = await res.json();
  return json.data;
};

export const fetchPropertyById = async (id) => {
  const res = await fetch(`https://mira-strapi-dev.q.starberry.com/api/properties/?populate=deep`);
  if (!res.ok) throw new Error('Network response was not ok');
  const json = await res.json();
  return json.data;
};