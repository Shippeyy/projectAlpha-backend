module.exports =
{
	postgresql: {
		connectionString: 'postgres://postgres:root@localhost:5432/projectAlpha'
	},
	server: {
		port: {
			http: 8080
		}
	},
	session: {
		secret: 'highlysecretandunhackablesecret'
	},
	log: {
		level: 'info'
	}
};