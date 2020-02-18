import cluster from 'cluster'
import configs from './configs/app.config'
import initWorker from './cluster-node-sever/setup-worker'
import initExpressServer from './cluster-node-sever/setup-express'

/**
 * Function create server for start the server
 * with clustering or net for test
 *
 * @param {string} activatedCluster True or falsy for using cluster
 * @constructor
 */

const initServer = activatedCluster => {
	if (activatedCluster && cluster.isMaster) {
		initWorker()
	} else {
		initExpressServer()
	}
}

initServer(configs.CLUSTER)
