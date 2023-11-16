import app from "./app";
const port = process.env.PORT || 5000;

// listen to port
app.listen(port, async () => {
  console.log(`🚀 Server ready at: http://localhost:${port}`);
});
