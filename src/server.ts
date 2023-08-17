import application from "./application";

const port = 8085;

application.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
