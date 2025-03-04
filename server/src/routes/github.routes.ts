// server/src/routes/githubApi.routes.ts
import { Router } from 'express';
import GithubApiController from '#controllers/github.api.controller';

const router = Router();

// Fix: Bind the method to preserve 'this' context
router.get('/getrepos', GithubApiController.getRepos.bind(GithubApiController));

export default router;