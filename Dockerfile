## Development
FROM node:20.10.0-bullseye-slim AS development
WORKDIR /usr/app
COPY package*.json ./
RUN npm install -g @pnpm/exe
RUN pnpm install
COPY . .

## Build 
FROM development AS build
RUN pnpm build
COPY .env ./dist

## Production
FROM node:20.10.0-bullseye-slim AS production
WORKDIR /usr/app
COPY package*.json ./
RUN npm install -g @pnpm/exe
RUN pnpm install
COPY --from=build /usr/app/dist ./dist
COPY .env .
EXPOSE 3333
CMD ["pnpm", "start:dev"]