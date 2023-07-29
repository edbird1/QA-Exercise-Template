import { app } from './index.js';
app.listen(6250)
console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
  );
  