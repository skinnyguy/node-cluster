import cluster from 'cluster'
import configs from './configs/app.config'
import initWorker from './cluster-node-sever/setup-worker'
import initExpressServer from './cluster-node-sever/setup-express'

/**
 * Function create server for start the server
 * with clustering or not for test
 *
 */
;(() => {
	return configs.CLUSTER && cluster.isMaster ? initWorker() : initExpressServer()
})()
