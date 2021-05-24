import {app, server} from "./app";

server.listen(app.get("port"), () => console.log(`SV ON PORT ${app.get("port")}`))