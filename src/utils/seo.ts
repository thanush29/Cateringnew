export const updateSEO = (title: string, description: string, url: string) => {
  document.title = title;

  const setMeta = (name: string, content: string) => {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", name);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  setMeta("description", description);
  setMeta("robots", "index, follow");

  // OG TAGS
  const setOG = (property: string, content: string) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("property", property);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  setOG("og:title", title);
  setOG("og:description", description);
  setOG("og:url", url);
  setOG("og:image", "https://shanvikcateringevents.com/Site-logo.png");
};
