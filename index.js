const port = 7001;
const server = require("./server");

//Always put the listen last
server.listen(port, () => console.log(`API running on port ${port}`));