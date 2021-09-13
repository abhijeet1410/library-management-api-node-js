import { Forbidden} from '@feathersjs/errors';

const CheckIfAdmin = () => async (context) => {

  const { params } = context;

  const { user } = params;

  if (user.role !== 2) {
    throw new Forbidden('You are not allowed.');
  }

};

export default CheckIfAdmin;
