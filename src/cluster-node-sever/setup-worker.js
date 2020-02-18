import cluster from 'cluster'

// Initialize empty worker service
const workers = []

// Setup number of worker process to share port when setting up server
const initWorker = () => {
	console.log()
	// Get how much cores on system
	let cores = require('os').cpus().length
	console.log(`🛠 Master cluster setting up with : ${cores} workers.`)

	// iterating number of cores
	for (let i = 0; i < cores; i++) {
		// Create worker and push in workers array
		workers.push(cluster.fork())

		// Receive message from workers
		workers[i].on('message', message => {
			console.log('💌 Message from workers : ', message)
		})
	}

	// Catch log when worker is online
	cluster.on('online', worker => {
		console.log('✅ Worker online with pid : ' + worker.process.pid + ' status : 🚥 listening')
	})

	// Catch log when worker is offline
	// After worker is exit, start new worker again
	cluster.on('exit', (worker, code, signal) => {
		console.log('❌ Worker with pid : ' + worker.process.pid + ' died! with code : ' + code + ' and signal : ' + signal)
		console.log('🚥 Starting new worker...')
		cluster.fork()
		workers.push(cluster.fork())

		// Get message from new process worker
		workers[workers.length - 1].on('message', message => {
			console.log('💌 Message from new workers : ', message)
		})
	})
}

export default initWorker
