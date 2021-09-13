const SetBookQuery= () => async context => {

  const { app, params } = context;

  const { query } = params;

  let { search } = query;

  if (search) {
    const authors = await app.service('author')._find({
      query: {
        status: 1,
        name: RegExp(search, 'i'),
        $select: ['_id'],
      },
      paginate: false,
    }).then(res => res.map(e => e._id));

    query.$or = [
      {
        author: {
          $in: authors,
        },
      },
      {
        name: RegExp(search, 'i'),
      }
    ];

    delete query.search;
  }

};

export default SetBookQuery;
