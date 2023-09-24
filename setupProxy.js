// setupProxy.js

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Define a proxy rule for your Express app
  app.use(
    "/api", // Specify the route that should be proxied
    createProxyMiddleware({
      target: "https://myapp-server.cyclic.cloud/", // Specify the URL of your Express app
      changeOrigin: true, // Add this option to handle CORS issues
    })
  );
};
