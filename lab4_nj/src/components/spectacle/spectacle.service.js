import Response from '../../utils/response.js';
import genreModule from '../genre/genre.module.js';
import screenwriterModule from '../screenwriter/screenwriter.module.js';
import Spectacle from './spectacle.entities.js';
import path from 'path'
import fs from 'fs'

class SpectacleService {
    constructor() {
      this.spectacles = [];
    }
  
    addSpectacle = async (spectacle) => {
        if (spectacle.title == null || spectacle.summary == null || spectacle.Duration == null ||
            spectacle.screenwriter_id == null || spectacle.genre_id == null || spectacle.cost == null)
            return new Response(null, 400, "Spectacle fields cannot be null");

        const screenwriter_ret = await screenwriterModule.service.getScreenwriter(spectacle.screenwriter_id);
        const screenwriter = screenwriter_ret.data;

        const genre_ret = await genreModule.service.getGenre(spectacle.genre_id);
        const genre = genre_ret.data;

        console.log(screenwriter, genre);

        if (genre == null)
            return new Response(null, 400, "No such genre");
        if (screenwriter == null)
            return new Response(null, 400, "No such screenwriter");

        const spectacles = await Spectacle.find({});

        if (spectacles.length == 0)
            spectacle.id = 0;
        else
            spectacle.id = spectacles[spectacles.length - 1].id + 1;

        console.log(spectacle.imgUrl);

        await spectacle.save();
        return new Response(spectacle, 201, "Create Successfull");
    };
  
    getSpectacles = async (filterGenre, sort, find) => {
      var spectacles = await Spectacle.find({});

      if (filterGenre != null) {
        var _genres = await genreModule.service.getGenres();
        var genres = JSON.parse(JSON.stringify(_genres.data));
        var genre = genres.find((genre) => genre.name == filterGenre);
        if (genre != null) 
          spectacles = spectacles.filter((spectacle) => spectacle.genre_id == genre.id);
        else
          spectacles =spectacles.filter((spectacle) => spectacle.genre_id == -1);
      }

      if (sort != null) {
        if (sort == 'asc') {
          spectacles.sort((a,b) => {
            if ( a.cost > b.cost ){
              return 1;
            }
            if ( a.cost < b.cost ){
              return -1;
            }
            return 0;
          });
        } else if (sort == 'desc') {
          spectacles.sort((a,b) => {
            if ( a.cost > b.cost ){
              return -1;
            }
            if ( a.cost < b.cost ){
              return 1;
            }
            return 0;
          });
        }
      }

      if (find != null) {
        spectacles = spectacles.filter((spectacle) => spectacle.title.startsWith(find));
      }

      return new Response(spectacles, 200, "Get Successfull");
    }
  
    getSpectacle = async (id) => {
      //const spectacle = this.spectacles.find((u) => u.id == id);
      const spectacle = await Spectacle.findOne({id: id}, 'id title cost summary Duration screenwriter_id genre_id imgUrl');

      if (spectacle == null) {
        return new Response(null, 400, "No such spectacle");
      }

      return new Response(spectacle, 200, "Get successfull");
    };

    putSpectacle = async (id, spectacle) => {
      console.log(spectacle);
      const _spectacle = await Spectacle.findOne({id: id}, 'id title cost summary Duration screenwriter_id genre_id imgUrl');

      if (_spectacle == null) {
        return new Response(null, 400, "No such spectacle");
      }

      console.log(spectacle);

      if (spectacle.title == null || spectacle.title == '' || spectacle.summary == null || spectacle.summary == '' || spectacle.Duration == null || spectacle.Duration == '' ||
        spectacle.screenwriter_id == null || spectacle.genre_id == null || spectacle.cost == null || spectacle.cost == '')
        return new Response(null, 400, "Spectacle fields cannot be null");

        const screenwriter_ret = await screenwriterModule.service.getScreenwriter(spectacle.screenwriter_id);
        const screenwriter = screenwriter_ret.data;

        const genre_ret = await genreModule.service.getGenre(spectacle.genre_id);
        const genre = genre_ret.data;

        console.log(screenwriter, genre);

        if (genre == null)
            return new Response(null, 400, "No such genre");
        if (screenwriter == null)
            return new Response(null, 400, "No such screenwriter");

      const ret = await Spectacle.findOneAndUpdate({id: id}, {title: spectacle.title, summary: spectacle.summary, Duration: spectacle.Duration, cost: spectacle.cost, screenwriter_id: spectacle.screenwriter_id, genre_id: spectacle.genre_id, imgUrl: spectacle.imgUrl}, {new: true});

      return new Response(ret, 200, "Put successfull");
    };

    deleteSpectacle = async (id) => {
      const _spectacle = await Spectacle.findOne({id: id});

      if (_spectacle == null)
        return new Response(null, 400, "No such spectacle");

      await Spectacle.findOneAndDelete({id: id});

      return new Response(_spectacle, 200, "Delete successfull");
    }
  }
  
  export default SpectacleService;