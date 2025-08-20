/** @type {import("drizzle-kit").Config} */
//for more we can visit https://orm.drizzle.team/docs/installation
export default ({
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_EWp2KDlY5Ike@ep-proud-bush-ad8oswuy-pooler.c-2.us-east-1.aws.neon.tech/ai-interview-mocker?sslmode=require&channel_binding=require'
  }
});
