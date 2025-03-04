import {Router} from 'express';
import GithubApiRoutes from '#/routes/github.routes.ts';
import githubRouter from '#/routes/github.routes.ts';
const router = Router();

router.get('/hello', (req, res) => {
  res.send('Hello World!');
});

router.use('/github', GithubApiRoutes);
router.use('/github', githubRouter);

// You can add more routers here...

export default router;
