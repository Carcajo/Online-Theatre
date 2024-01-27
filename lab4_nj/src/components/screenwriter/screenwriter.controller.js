import Screenwriter from './screenwriter.entities.js';
import jwt from 'jsonwebtoken'

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

  const role = decoded.user.role;

  if (role != "Staff" && role != 'Admin') {
    return false;
  }

  return true;
}

class ScreenwriterController {
  constructor(screenwriterService) {
    this.screenwriterService = screenwriterService;
  }

  createScreenwriter = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const screenwriter = new Screenwriter({name: req.body.name});
    const ret = await this.screenwriterService.addScreenwriter(screenwriter);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };

  getScreenwriters = async (_, res) => {
    const ret = await this.screenwriterService.getScreenwriters();
    res.status(200).send(ret.data);
  }

  getScreenwriter = async (req, res) => {
    const { id } = req.params;
    const ret = await this.screenwriterService.getScreenwriter(id);

    if (ret.data == null)
      return res.status(200).send(ret.msg);
    
    return res.status(200).send(ret.data);
  };

  putScreenwriter = async (req, res) => {
    const { id } = req.params;

    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const screenwriter = new Screenwriter({name: req.body.name});
    const ret = await this.screenwriterService.putScreenwriter(id, screenwriter);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };

  deleteScreenwriter = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const { id } = req.params;
    const ret = await this.screenwriterService.deleteScreenwriter(id);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };
}

export default ScreenwriterController;