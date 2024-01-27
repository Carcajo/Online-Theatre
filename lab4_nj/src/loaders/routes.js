import userModule from '../components/user/user.module.js';
import genreModule from '../components/genre/genre.module.js';
import screenwriterModule from '../components/screenwriter/screenwriter.module.js';
import spectacleModule from '../components/spectacle/spectacle.module.js';
import articleModule from '../components/article/article.module.js'
import vacancyModule from '../components/vacancy/vacancy.module.js'
import historyModule from '../components/history/history.module.js'
import authModule from '../components/Auth/auth.module.js'
import orderModule from '../components/order/order.module.js';

export default (app) => {
  app.use('/users', userModule.router);
  app.use('/genres', genreModule.router);
  app.use('/screenwriters', screenwriterModule.router);
  app.use('/spectacles', spectacleModule.router);
  app.use('/articles', articleModule.router);
  app.use('/vacancies', vacancyModule.router);
  app.use('/histories', historyModule.router);
  app.use('/auth', authModule.router);
  app.use('/orders', orderModule.router);
};