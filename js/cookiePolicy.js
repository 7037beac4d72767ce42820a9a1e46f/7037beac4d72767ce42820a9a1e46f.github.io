window.addEventListener("load", () => {
  window.wpcc.init({
    border: "thin",
    colors: {
      popup: {
        background: "#f6f6f6",
        text: "#000000",
        border: "#555555",
      },
      button: {
        background: "#555555",
        text: "#ffffff",
      },
    },
    padding: "small",
    margin: "small",
    transparency: "5",
    fontsize: "tiny",
    content: {
      href: "https://portfolio.jttorate.com/cookie-policy",
    },
    position: "bottom-right",
    corners: "normal",
  });
});
