FROM node:18-alpine AS builder


# Set up the working directory
WORKDIR /app


# Copy package.json та package-lock.json
COPY package.json package-lock.json ./


# Setting up dependencies
RUN npm install


# Copy all the code into the container
COPY . .


# Assembling the project
RUN npm run build


# ---------------------------------------
# The final container
FROM nginx:alpine


# Set up the working directory
WORKDIR /usr/share/nginx/html


# Delete default Nginx files
RUN rm -rf ./*


# Copy the collected React files to the container
COPY --from=builder /app/dist .


# Copy the custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Open port 80
EXPOSE 80


# Starting Nginx
CMD ["nginx", "-g", "daemon off;"]
