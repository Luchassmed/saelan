const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchFromStrapi(path) {
  const headers = { "Content-Type": "application/json" };
  if (STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

function transformProject(item) {
  const rawImages = Array.isArray(item.images) ? item.images : [];
  return {
    slug: item.slug,
    title: item.title,
    category: item.category,
    description: item.description,
    images: rawImages.map((img) => {
      const url = img.url;
      return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
    }),
    year: item.year,
    where: item.where,
    who: item.who,
  };
}

export async function getAllProjects() {
  try {
    const data = await fetchFromStrapi(
      "/projects?populate=images&sort=title:asc"
    );
    return data.data.map(transformProject);
  } catch (e) {
    console.error("Failed to fetch projects:", e.message);
    return [];
  }
}

export async function getProjectBySlug(slug) {
  try {
    const data = await fetchFromStrapi(
      `/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=images`
    );
    if (!data.data || data.data.length === 0) return null;
    return transformProject(data.data[0]);
  } catch (e) {
    console.error("Failed to fetch project:", e.message);
    return null;
  }
}

export async function getProjectsByCategory(category) {
  try {
    const data = await fetchFromStrapi(
      `/projects?filters[category][$eq]=${encodeURIComponent(category)}&populate=images&sort=title:asc`
    );
    return data.data.map(transformProject);
  } catch (e) {
    console.error("Failed to fetch projects by category:", e.message);
    return [];
  }
}
