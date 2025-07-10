const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const rateLimit = require("express-rate-limit");
// const verifyToken = require("./utils/auth");
const services = require("./services");

const app = express();

// Global rate limiter (per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: { error: "Too many requests, try again later." },
});
app.use(limiter);

// Proxy to User Service
app.use(
  "/api/users",
  createProxyMiddleware({
    target: services["user-service"],
    changeOrigin: true,
    pathRewrite: { "^/api/users": "/users" },
  }),
);

// Proxy to Product Service
app.use(
  "/api/products",
  createProxyMiddleware({
    target: services["product-service"],
    changeOrigin: true,
    pathRewrite: { "^/api/products": "/products" },
  })
);

// Proxy to Cart Service
app.use(
  "/api/cart",
  createProxyMiddleware({
    target: services["cart-service"],
    changeOrigin: true,
    pathRewrite: { "^/api/cart": "/cart" },
  })
);

// Proxy to Order Service
app.use(
  "/api/order",
  createProxyMiddleware({
    target: services["order-service"],
    changeOrigin: true,
    pathRewrite: { "^/api/order": "/order" },
  })
);

// Proxy to Notification Service
app.use(
  "/api/notifications",
  createProxyMiddleware({
    target: services["notification-service"],
    changeOrigin: true,
    pathRewrite: { "^/api/notifications": "/notifications" },
  })
);

// Proxy to Inventory Service
app.use(
  "/api/inventory",
  createProxyMiddleware({
    target: services["inventory-service"],
    changeOrigin: true,
    pathRewrite: { "^/api/inventory": "/inventory" },
  })
);

app.listen(3000, () => {
  console.log("API Gateway running on http://localhost:3000");
});
