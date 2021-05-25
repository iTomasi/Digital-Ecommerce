import { app, server } from './app';
import './databases/mongodb';

server.listen(app.get('port'), () =>
	console.log(`SV ON PORT ${app.get('port')}`)
);
