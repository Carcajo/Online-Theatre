import ScreenwriterController from './screenwriter.controller.js';
import ScreenwriterService from './screenwriter.service.js';
import ScreenwriterRouter from './screenwriter.router.js';

const screenwriterService = new ScreenwriterService();
const screenwriterController = new ScreenwriterController(screenwriterService);
const screenwriterRouter = new ScreenwriterRouter(screenwriterController);

export default {
  service: screenwriterService,
  controller: screenwriterController,
  router: screenwriterRouter.getRouter(),
};