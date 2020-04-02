import testsRoutes from './tests/routes';
import elasticSearchRoutes from './elasticsearch/routes';

export default [...testsRoutes, ...elasticSearchRoutes];
