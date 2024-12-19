export const ExtensionToText = (extension) => {
    const ExtensionToTextMapper = {
      js: "javascript",
      jsx: "javascript",
      css: "css",
      html: "html",
      svg: "xml",
      gitignore: "plaintext",
      json: "json",
      env: "plaintext",
    };

    return ExtensionToTextMapper[extension] || "plaintext";
  };
  