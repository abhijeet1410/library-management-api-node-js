import {BadRequest} from '@feathersjs/errors';
import CheckIfAdmin from '../../../hooks/CheckIfAdmin';

const CheckIfAuthorAlreadyExists = () => async context => {

  const { data , app } = context;

  if (Array.isArray(data)) {
    let nameArray = data.map(e => e.name.toLowerCase());
    console.log(nameArray);
    let duplicate = nameArray.some((e, i, self) => self.indexOf(e) !== i);
    console.log(duplicate);
    if (duplicate) {
      throw new BadRequest('Error msg.');
    }
  } else {
    const { name } = data ;

    const author = await app.service('author').find({
      query : {
        name
      }
    }).then(
      res => res.total > 0 ? res.data[0] : null
    );

    if(author)
      throw new BadRequest('This Author is already registered in nour platform');
  }

  await CheckIfAdmin()(context);

  return context;
};

export default CheckIfAuthorAlreadyExists;

// query : {
//    $populate : [ 'author' , 'createdBy']
// }
// ?$populate[]=author&$populate[]=createdBy


// query: {
//  $sort : {
//    createdAt : -1
//  }
// }
// ?$sort[createdAt]=-1
