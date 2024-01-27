import Response from '../../utils/response.js';
import Screenwriter from './screenwriter.entities.js';

class ScreenwriterService {
    constructor() {
      this.screenwriters = [];
    }
  
    addScreenwriter = async (screenwriter) => {
      if (screenwriter.name == undefined)
        return new Response(null, 400, "Name cannot be null");

      const screenwriters = await Screenwriter.find({});

      if (screenwriters.length == 0)
          screenwriter.id = 0;
      else
          screenwriter.id = screenwriters[screenwriters.length - 1].id + 1;

      await screenwriter.save();
      return new Response(screenwriter, 201, "Create successfull");
    };
  
    getScreenwriters = async () => {
      return new Response(await Screenwriter.find({}, 'id name'), 200, "Get successfull");
    }
  
    getScreenwriter = async (id) => {
      const screenwriter = await Screenwriter.findOne({id: id}, 'id name');

      if (screenwriter == null)
        return new Response(null, 400, "No such screenwriter");

      return new Response(screenwriter, 200, "Get successfull");
    };

    putScreenwriter = async (id, screenwriter) => {
      const _screenwriter = await Screenwriter.findOne({id: id}, 'id name');

      if (_screenwriter == null)
        return new Response(null, 400, "No such screenwriter");

      if (screenwriter.name == null)
        return new Response(null, 400, "Name cannot be null");

      const ret = await Screenwriter.findOneAndUpdate({id: id}, {name: screenwriter.name}, {new: true});

      return new Response(ret, 200, "Put successfull");
    };

    deleteScreenwriter = async (id) => {
      const _screenwriter = await Screenwriter.findOne({id: id}, 'id name');

      if (_screenwriter == null)
        return new Response(null, 400, "No such screenwriter");

      await Screenwriter.findOneAndDelete({id: id});

      return new Response(_screenwriter, 200, "Delete successfull");
    };
  }
  
  export default ScreenwriterService;