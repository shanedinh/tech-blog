const router = require('express').Router();
// requireing a folder which looks for the index.js inside
const apiRoutes = require('./api/');
// requireing a name with a extention points to a file
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// http://localhost:3001/
router.use('/', homeRoutes);
// http://localhost:3001/dashboard
router.use('/dashboard', dashboardRoutes);
// http://localhost:3001/api
router.use('/api', apiRoutes);
// allows express to handle the routes  
// also passes the exported router so that it can be imported/setup/used in the server.js;
module.exports = router;
