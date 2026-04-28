# Libra Static Review Site

This repository contains the static review/demo site for Libra, deployed at:

https://librafairness.org

Libra is a community-governed AI fairness workflow. The demo shows how a community-defined fairness standard can move from draft, to signed receipt, to public registry record, to vendor evidence review, and then into procurement-facing materials.

## Review Status

The District 3 / Emily material is explicitly demo/sample and pre-session. The real resident session has not happened yet, so the current artifacts are planning artifacts, not claimed civic results.

## Related Repositories

- Static demo source: https://github.com/MattJaxson/librafairness.org
- Implementation and API history: https://github.com/MattJaxson/fairlens-api
- Research framework foundation: https://github.com/MattJaxson/adaptive-racial-fairness-framework

## Local Development

```bash
npm install
npm run dev:web
```

## Static Build

```bash
npm run build:web:static-preview
```

The static output is written to `apps/web/dist-static-preview`.
