// book-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
  const modelName = 'book';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
    },
    author: {
      type : Schema.Types.ObjectId,
      ref: 'author',
      required: true,
    },
    availableUnits: {
      type: Number,
      required: true
    },
    cover: {
      type: String,
      required: true,
    },
    status: {
      type : Number,
      enum: [
        1 , // Active
        0 , // Deleted
      ],
      default: 1,
    }

  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
