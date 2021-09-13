import {BadRequest} from '@feathersjs/errors';

const ManageUpload = () => context => {

  const { app, data } = context;

  const { result, message } = data;

  if (!result) {
    throw new BadRequest(message);
  }

};

export default ManageUpload;
