<h1 align="center">Page Size</h1>
<p align="center">
<a href="https://www.page-size.com" target="_blank" rel="noopener"><img src="https://pagesize.fly.dev/api/badge/612/purple" alt="Page-size badge" style="height: 25px" /></a>
<a href="https://www.page-size.com" target="_blank" rel="noopener"><img src="https://pagesize.fly.dev/api/badge/612/blue" alt="Page-size badge" style="height: 25px" /></a>
   <a href="https://www.page-size.com" target="_blank" rel="noopener"><img src="https://pagesize.fly.dev/api/badge/612/red" alt="Page-size badge" style="height: 25px" /></a>
</p>


A simple service that calculates and generates a small SVG badge that displays the size of any webpage in kilobytes, aiming to bring transparency to web development and encourage mindful data usage.

## Why this project?

The goal of this project is to encourage transparency in web development and promote conscious data usage. By reducing the digital footprint, we not only offer a smoother user experience but also take care of our planet 🌎.

Some lightweight things that are awesome:
- 🪶 Feathers
- 💭 Bubbles
- ☁️ Fluffy clouds
- ❄️ Crisp snowflakes
- 🚀 Super-fast websites

## How does it work?

1. Input a URL
2. Click 'Generate'
3. Embed the badge using HTML or Markdown code

### About

- Badges auto-update every 30 days
- Manually recheck anytime
- Page sizes are cached to minimise requests and conserve data
- This project is a work in progress. Some sites may present issues.

### Badges

![page-size.com badge](https://pagesize.fly.dev/api/badge/612/green)

![page-size.com badge](https://pagesize.fly.dev/api/badge/612/red)

![page-size.com badge](https://pagesize.fly.dev/api/badge/612/blue)

![page-size.com badge](https://pagesize.fly.dev/api/badge/612/purple)

![page-size.com badge](https://pagesize.fly.dev/api/badge/612/orange)

![page-size.com badge](https://pagesize.fly.dev/api/badge/612/grey)

![page-size.com badge](https://pagesize.fly.dev/api/badge/612/darkgreen)

![page-size.com badge](https://pagesize.fly.dev/api/badge/612/darkblue)

## Branch Information

### 1. Main Branch

An version which calculates page sizes and generates badges but consumes more resources.

### 2. Deployed Branch

A simpler, lightweight version that exposes a single endpoint for generating SVG badges based on user input.

## Tech Stack

- **Language**: TypeScript
- **Server**: bun.sh with express
- **Client**: Preact.js
- **Database**: Postgres with Supabase
- **Deployment**: Fly.io for server and Netlify for client

## Getting Started


1. Clone the repository.
2. `cd client` && `yarn install` or `bun upgrade`
3. `cd server` && `bun upgrade`
3. Create `.env` inside `/server` and set up your environment variables:

   ```
   PORT=8080
   HOST=0.0.0.0
   SUPABASE_URL=www.example.com
   SUPABASE_ANON_KEY=123456
   SUPABASE_KEY=123456
   ```
4. For the server, run: `bun run dev`
5. For the client, run: `yarn run dev` or `bun run dev`

#### Database data definition for Supabase
```sql
create table
public.urls (
id bigint generated by default as identity,
created_at timestamp with time zone not null default now(),
url character varying not null default ''::character varying,
size bigint null,
"updated_At" timestamp with time zone not null default now(),
constraint urls_pkey primary key (id),
constraint urls_url_key unique (url)
) tablespace pg_default;
```
