FROM node:latest as base-node
WORKDIR /app

#frontend
FROM base-node as frontend
WORKDIR /app
COPY ./frontend/package.json ./
RUN npm install
ADD ./frontend ./
RUN API_URL=/api npm run generate

#backend
FROM base-node as backend
WORKDIR /app
COPY ./backend/package.json ./
RUN npm install
ADD ./backend ./
RUN npm run build


FROM node:latest as final_build
WORKDIR /app
COPY --from=backend /app /app
COPY --from=frontend /app/dist /app/static
CMD npm run start

#nginx
FROM nginx:stable as final_nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=final_build /app/static .
COPY ./nginx/conf.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
