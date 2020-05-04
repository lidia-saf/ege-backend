import elasticSearchRoutes from './elasticsearch/routes';
import testDescRoutes from './testdescription/routes';

export default [...elasticSearchRoutes, ...testDescRoutes];
