# @mostakim-dl/api

a free & open source media downloader api. supports youtube, instagram, tiktok, twitter/x, reddit, soundcloud, and more.

## install & run

```bash
npx @mostakim-dl/api
```

or install globally:

```bash
npm install -g @mostakim-dl/api
mostakim
```

## required setup

create a `.env` file before running:

```env
API_URL=https://your-api-domain.com
```

## quick start

```bash
API_URL=https://my-api.onrender.com npx @mostakim-dl/api
```

## environment variables

| variable | required | default | description |
|---|---|---|---|
| `API_URL` | ✅ | — | your api's public url |
| `API_PORT` | no | `9000` | port to listen on |
| `CORS_WILDCARD` | no | `0` | set to `1` to allow all origins |
| `RATE_LIMIT_WINDOW` | no | `60` | rate limit window in seconds |
| `RATE_LIMIT_MAX` | no | `20` | max requests per window |
| `DURATION_LIMIT` | no | `10800` | max video duration in seconds |

## supported services

| service | video + audio | only audio | only video |
|---|---|---|---|
| youtube | ✅ | ✅ | ✅ |
| instagram | ✅ | ✅ | ✅ |
| tiktok | ✅ | ✅ | ✅ |
| twitter/x | ✅ | ✅ | ✅ |
| reddit | ✅ | ✅ | ✅ |
| soundcloud | ➖ | ✅ | ➖ |
| vimeo | ✅ | ✅ | ✅ |
| dailymotion | ✅ | ✅ | ✅ |
| facebook | ✅ | ❌ | ✅ |
| snapchat | ✅ | ✅ | ✅ |
| pinterest | ✅ | ✅ | ✅ |
| bluesky | ✅ | ✅ | ✅ |
| tumblr | ✅ | ✅ | ✅ |
| twitch clips | ✅ | ✅ | ✅ |
| vk | ✅ | ❌ | ✅ |
| rutube | ✅ | ✅ | ✅ |
| bilibili | ✅ | ✅ | ✅ |
| streamable | ✅ | ✅ | ✅ |
| loom | ✅ | ❌ | ✅ |
| ok.ru | ✅ | ❌ | ✅ |
| newgrounds | ✅ | ✅ | ✅ |

## source code & self hosting

[github.com/mostakim-sagor/MOSTAKIM-API-V2](https://github.com/mostakim-sagor/MOSTAKIM-API-V2)

## license

AGPL-3.0
