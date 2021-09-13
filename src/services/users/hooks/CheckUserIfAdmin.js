import {BadRequest} from '@feathersjs/errors';

const CheckUserIfAdmin = () => async context => {
  const { data , app } = context;
  const { role } = data ;

  if(role === 2){
    const users = await app.service('users').find({
      query : {
        role
      }
    }).then(
      res => res.total > 0 ? res.data[0] : null
    );

    if(users)
      throw new BadRequest('You can\'t register more than one admins');
  }
};
export  default CheckUserIfAdmin;
