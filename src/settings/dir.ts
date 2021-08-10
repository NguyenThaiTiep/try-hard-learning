export const hostServer =
  process.env.NODE_ENV == "production"
    ? "https://api.hoclieu.vn"
    : "http://localhost:3000";
