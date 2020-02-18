const configs = {
	ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.APP_PORT || 8080,
	CLUSTER: Boolean(process.env.NODE_ENV === 'production') || false,
}

export default configs
