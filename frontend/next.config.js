module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.4",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};
