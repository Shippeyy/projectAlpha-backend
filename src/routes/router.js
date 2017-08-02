import Express from 'express';
import UserRoute from './UserRoute';
import ProjectRoutes from './ProjectRoutes';
import PermissionlevelRoutes from './PermissionlevelRoutes';
import Users_have_ProjectsRoutes from './Users_have_ProjectsRoutes';

let router = Express.Router();

router.use(UserRoute);
router.use(ProjectRoutes);
router.use(PermissionlevelRoutes);
router.use(Users_have_ProjectsRoutes);

module.exports = router;