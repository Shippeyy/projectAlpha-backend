import utils from './utils';
import config from './config/config';

utils.createApp().listen(config.server.port.http, function() {
	console.log("Server started");
});
