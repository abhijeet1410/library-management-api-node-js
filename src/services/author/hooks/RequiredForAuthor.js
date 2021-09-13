import {BadRequest} from '@feathersjs/errors';

const RequiredForAuthor = () => context => {

  const { data } = context;


  if (Array.isArray(data)){
    for (let each of data){
      const { name , genres } = each ;

      if(!name)
        throw new BadRequest('Please Provide a name');

      if(!genres || !Array.isArray(genres) || genres.length === 0)
        throw new BadRequest('Please Provide some genres for the author');
    }
  }else {
    const { name , genres } = data ;

    if(!name)
      throw new BadRequest('Please Provide a name');

    if(!genres || !Array.isArray(genres) || genres.length === 0)
      throw new BadRequest('Please Provide some genres for the author');
  }

  return context;
};

export default RequiredForAuthor;
