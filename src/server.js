import utils from './utils';
import config from './config/config';

utils.createApp().listen(config.server.port.http, function() {
	let cli =
	"                _         _   _____ _     _       " + "\n" + 
	"  ___ ___ ___  |_|___ ___| |_|  _  | |___| |_ ___ " + "\n" +
	" | . |  _| . | | | -_|  _|  _|     | | . |   | .'|" + "\n" +
	" |  _|_| |___|_| |___|___|_| |__|__|_|  _|_|_|__,|" + "\n" +
	" |_|         |___|                   |_|          " + "\n" +
	" ------------------------------------------------" + "\n" +
	"|               webservice started               |" + "\n" +
	"|                   port: " + config.server.port.http + "                   |"+ "\n" +
	"|        startup timestamp: " + Date.now() + "        |"  + "\n" +
	"|              version: " + config.version.version + " " + config.version.currentState + "              |" + "\n" +
	" ------------------------------------------------"

	console.log(cli);
});
