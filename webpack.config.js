module.exports = {
  // Entry point of react application
  entry: "./app/app.js",
  // The plain compiled JavaScript will be output into this file
  output: {
    filename: "public/bundle.js"
  },
  // This section describes the transformations to be performed
  module: {
    loaders: [
      {
        // Only working with files that in in a .js or .jsx extension
        test: /\.jsx?$/,
        // Webpack will only process files in the app folder. This avoids processing
        // node modules and server files unnecessarily
        include: /app/,
        loader: "babel",
        query: {
          // These are the specific transformations to be used.
          presets: ["react", "es2015"]
        }
      }
    ]
  },
  // This makes it possible to debug react code in chrome dev tools. Errors will have lines and file names
  // Without this the console says all errors are coming from just coming from bundle.js
  devtool: "eval-source-map"
};