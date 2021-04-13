module.exports = {
  siteMetadata: {
    title: "Books",
  },
  assetPrefix: "assets",
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-tidy",
      options: {
        cleanPublic: true,
        cleanCache: true,
        removeHashes: false,
        removeArtifacts: true,
        noJsMap: false,
        removeInlineStyles: true,
        jsDir: "js",
        cssDir: "css",
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Open+Sans\:300,400,400i,700,800`],
        display: "swap",
      },
    },
  ],
};
