import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth } from '@feathersjs/authentication-oauth';

export default app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('/authentication', authentication);

  const service = app.service('authentication');

  service.hooks({
    before:{
      create: [
        // ctx => {
        // // check if user email exists or not.
        //   throw new FeathersError('Invalid', 'Too Early!', 469, 'Demo', {});
        // }
      ]
    },
    after: {
      create: [
        /// Send field after login
        ctx =>{
          const { result: res } = ctx;
          // const {user} = res;
          // user.message = 'Hello';
          //res.user.message = 'Hiii';
        }
      ]
    }
  });

  app.configure(expressOauth());
};
