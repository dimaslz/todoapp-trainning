FROM node:14.15.5-alpine3.10 as builder

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build-ts

FROM node:14.15.5-alpine3.10 as production
# FROM node:14.15.5-buster-slim as production

WORKDIR /app

COPY --from=builder /app/entrypoint.sh /app/entrypoint.sh
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/.env /app/.env
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

RUN chmod +x entrypoint.sh

EXPOSE 3002

# CMD ["node", "dist/server.js"]
ENTRYPOINT [ "./entrypoint.sh" ]
