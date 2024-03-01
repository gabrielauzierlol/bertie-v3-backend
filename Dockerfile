## Development
FROM node:20.10.0-bullseye-slim AS development
WORKDIR /usr/app
COPY package*.json ./
RUN npm install -g @pnpm/exe
RUN pnpm install
COPY . .

## Production
FROM node:20.10.0-bullseye-slim AS build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install -g @pnpm/exe
RUN pnpm i
COPY . /usr/src/app
RUN pnpm run build

FROM build AS production
COPY --from=build /usr/src/app /usr/src/app
EXPOSE 3000
WORKDIR /usr/src/app
ENV ENVIRONMENT production
ENV NODE_ENV production
CMD ["pnpm", "start"] 