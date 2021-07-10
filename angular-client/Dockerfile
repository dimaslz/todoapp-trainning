
FROM node:14.15.5-alpine3.10 as builder

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

FROM nginx:alpine

COPY --from=builder /app/dist/client /usr/share/nginx/html
COPY --from=builder /app/nginx /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]