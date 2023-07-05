const mapping: Record<string, string> = {
  blogs: 'blog',
  interviews: 'interview',
  organizations: 'organization',
  users: 'user',
  works: 'work',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
