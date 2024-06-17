function titleAppend(appendage) {
  if (!appendage) return;
  document.title = `${document.title} ${appendage}`;
  const ogTitleEl = document.querySelector('meta[property="og:title"]');
  if (ogTitleEl) ogTitleEl.setAttribute('content', document.title);
  const twitterTitleEl = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitleEl) twitterTitleEl.setAttribute('content', document.title);
}

exports["default"] = titleAppend;
//# sourceMappingURL=title-append-1ef6ee7c.js.map
