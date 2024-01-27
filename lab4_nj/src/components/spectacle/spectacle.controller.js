import Spectacle from './spectacle.entities.js';
import jwt, { decode } from 'jsonwebtoken';

function check_jwt(token) {

  const decoded = jwt.verify(token, 'privatekey', (err, decoded) => {
    if (err) {
    } else {
      return decoded;
    }
  });

  if (decoded == undefined) {
    return false;
  }

  return true;
}

class SpectacleController {
  constructor(spectacleService) {
    this.spectacleService = spectacleService;
  }

  createSpectacle = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');
    console.log(req.body.image);
    const spectacle = new Spectacle({title: req.body.title, summary: req.body.summary, Duration: req.body.Duration, cost: req.body.cost, screenwriter_id: req.body.screenwriter_id, genre_id: req.body.genre_id, imgUrl: req.body.imgUrl});
    
    if (req.body.cost < 0) {
      return res.status(404).send('Price cannot be negative');
    }

    if (req.body.Duration < 0) {
      return res.status(404).send('Duration cannot be negative');
    }

    const ret = await this.spectacleService.addSpectacle(spectacle);

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);
   
    return res.status(ret.status_code).send(ret.data);
  };

  getSpectacles = async (req, res) => {
    const filterGenre =  req.query.filterGenre;
    const sort = req.query.sort;
    const find = req.query.find;

    const ret = await this.spectacleService.getSpectacles(filterGenre, sort, find);
    return res.status(ret.status_code).send(ret.data);
  }

  getSpectacle = async (req, res) => {
    const { id } = req.params;

    const ret = await this.spectacleService.getSpectacle(id);

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);
   
    return res.status(ret.status_code).send(ret.data);
  };

  putSpectacle = async (req, res) => {
    const { id } = req.params;

    if (req.body.cost < 0) {
      return res.status(404).send('Price cannot be negative');
    }

    if (req.body.Duration < 0) {
      return res.status(404).send('Duration cannot be negative');
    }

    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const spectacle = new Spectacle({title: req.body.title, summary: req.body.summary, Duration: req.body.Duration, cost: req.body.cost, screenwriter_id: req.body.screenwriter_id, genre_id: req.body.genre_id, imgUrl: req.body.imgUrl});
    const ret = await this.spectacleService.putSpectacle(id, spectacle);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };

  deleteSpectacle = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const { id } = req.params;
    const ret = await this.spectacleService.deleteSpectacle(id);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };
}

export default SpectacleController;