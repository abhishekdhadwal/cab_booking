
import user_routes from './user_routes';
import driver_routes from './driver_routes'

const router : any = [ ...user_routes, ...driver_routes ]

export default router