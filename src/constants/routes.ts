export const routes = {
  getHomeRoute: () => "/",
  getCharacterRoute: (name?: string | null) => `/character/${name}`,
} as const;

export default routes;
