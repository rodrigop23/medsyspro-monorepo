export default {
  databaseUrl:
    process.env.DATABASE_URL ||
    'postgres://user:password@localhost:5432/results',
};
