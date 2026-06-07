FROM denoland/deno:2.8.1

WORKDIR /app

COPY . .

RUN deno task build

EXPOSE 8000

CMD [ "serve", "-A", "_fresh/server.js" ]
