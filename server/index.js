const PORT = process.env.PORT | 3000
const app = require("./src/app")
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`))
