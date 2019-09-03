FROM node AS build
WORKDIR /dist
COPY public public
COPY package.json package.json
RUN yarn install
COPY src src
RUN yarn build

FROM nginx:stable
COPY --from=build /dist/build/ /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
