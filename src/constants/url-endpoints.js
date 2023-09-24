const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://myapp-server.cyclic.cloud"
    : "http://localhost:4000";

export const USERS_URL = `${BASE_URL}/api/users`;
