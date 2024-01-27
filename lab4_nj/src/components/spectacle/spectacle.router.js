
import express from 'express';

class SpectacleRouter {
  constructor(spectacleController) {
    this.spectacleController = spectacleController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.spectacleController.getSpectacle);
    router.route('/:id').put(this.spectacleController.putSpectacle);
    router.route('/:id').delete(this.spectacleController.deleteSpectacle);
    router.route('/').get(this.spectacleController.getSpectacles);
    router.route('/').post(this.spectacleController.createSpectacle);
    return router;
  }
}

export default SpectacleRouter;