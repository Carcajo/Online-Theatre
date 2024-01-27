import SpectacleController from './spectacle.controller.js';
import SpectacleService from './spectacle.service.js';
import SpectacleRouter from './spectacle.router.js';

const spectacleService = new SpectacleService();
const spectacleController = new SpectacleController(spectacleService);
const spectacleRouter = new SpectacleRouter(spectacleController);

export default {
  service: spectacleService,
  controller: spectacleController,
  router: spectacleRouter.getRouter(),
};