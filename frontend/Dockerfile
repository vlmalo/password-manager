FROM node:20 AS build

# Set working directory
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Expose port 4200
EXPOSE 4200

# Build the Angular app for production
RUN ng build --configuration=production

CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]

