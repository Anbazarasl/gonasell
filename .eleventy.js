module.exports = function(eleventyConfig) {
  // Zero-pad numbers: {{ 1 | pad(2) }} → "01"
  eleventyConfig.addFilter("pad", (num, size) => String(num).padStart(size, '0'));

  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
eleventyConfig.addPassthroughCopy("src/admin");

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data"
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk"
  };
};
