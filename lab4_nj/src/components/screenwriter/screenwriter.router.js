
import express from 'express';

class ScreenwriterRouter {
  constructor(screenwriterController) {
    this.screenwriterController = screenwriterController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.screenwriterController.getScreenwriter);
    router.route('/:id').put(this.screenwriterController.putScreenwriter);
    router.route('/:id').delete(this.screenwriterController.deleteScreenwriter);
    router.route('/').get(this.screenwriterController.getScreenwriters);
    router.route('/').post(this.screenwriterController.createScreenwriter);
    return router;
  }
}

export default ScreenwriterRouter;