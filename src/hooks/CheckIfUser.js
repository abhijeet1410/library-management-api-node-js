import { Forbidden} from '@feathersjs/errors';

const CheckIfUser = () => async (context) => {

  const { params } = context;

  const { user } = params;

  if (user.role !== 1) {
    throw new Forbidden('You are not allowed.');
  }

};

export default CheckIfUser;
