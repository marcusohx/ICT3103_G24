# Create Build folder for React
FROM node:lts-alpine3.18 as build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

RUN npm run build

# Run Nginx
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/sitgigs.online.crt /etc/ssl/sitgigs.online.crt
COPY --from=build /app/sitgigs.online.key /etc/ssl/sitgigs.online.key
EXPOSE 443

# Copy existing nginx config file
COPY ./nginx/ict3103.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
