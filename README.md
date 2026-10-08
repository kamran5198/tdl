# Taskboard

Personal task manager: categories, priority bars, per-task comments, subtasks, repeating tasks, calendar (start and due dates, overdue in red), search and filters, dark mode, JSON export/import.

## Deploy (GitHub + Vercel)

1. Create a new GitHub repository and upload everything in this folder (keep the `api` and `public` folders).
2. In Vercel: **Add New > Project**, import the repository, leave the framework as **Other**, click **Deploy**.
3. **Storage** (needed so tasks and comments are saved on the server, not only in one browser):
   Vercel project > **Storage** > create an **Upstash Redis** database from the Marketplace and connect it to the project. This adds the `KV_REST_API_URL` and `KV_REST_API_TOKEN` variables automatically.
4. **Password** (recommended, the URL is public): Project > **Settings > Environment Variables** > add `APP_PASSWORD` with a value you choose.
5. **Redeploy** (Deployments > latest > Redeploy) so the variables take effect.

The header shows **Synced** when the database is working, or **Local only** when it is not connected (data then lives only in that browser).

## Run locally

```
npm start
```

Open http://localhost:3000. Data is saved to `data.json`. Set `APP_PASSWORD` in your shell to test the password.

## Keyboard

`N` new task, `/` search, `Esc` close the task panel.
