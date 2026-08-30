const pwaMeta = [
  ["theme-color", "#ff5722"],
  ["mobile-web-app-capable", "yes"],
  ["apple-mobile-web-app-capable", "yes"],
  ["apple-mobile-web-app-status-bar-style", "default"],
  ["apple-mobile-web-app-title", "MyFirstapp"]
];

const manifest = document.createElement("link");
manifest.rel = "manifest";
manifest.href = "/manifest.json";
document.head.appendChild(manifest);

pwaMeta.forEach(([name, content]) => {
  const meta = document.createElement("meta");
  meta.name = name;
  meta.content = content;
  document.head.appendChild(meta);
});
