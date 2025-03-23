# Step 1: Use Node.js official image
FROM node:18-alpine AS builder

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your app's code
COPY . .

# Step 6: Build the app for production
RUN npm run build

# Step 7: Use a lightweight web server to serve the app
FROM nginx:alpine

# Step 8: Copy custom NGINX configuration
COPY /nginx.conf /etc/nginx/nginx.conf

# Step 9: Copy the build output to the NGINX HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Step 10: Expose port 80
EXPOSE 80

# Step 11: Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
