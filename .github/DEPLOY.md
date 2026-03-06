# Деплой и локальная разработка

## Локальная разработка (без деплоя на Vercel)

- Работай в ветке **`dev`**
- Пушь изменения: `git push origin dev`
- Vercel не деплоит production из `dev`

## Деплой на Vercel

1. Смержи `dev` в `main`:
   ```bash
   git checkout main
   git merge dev
   ```
2. Запушь main (обход хука):
   ```bash
   git push origin main --no-verify
   ```

## Pre-push hook

Хук блокирует `git push origin main`, чтобы не задеплоить изменения случайно.
