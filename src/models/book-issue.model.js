// book-issue-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
  const modelName = 'bookIssue';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { ObjectId } = Schema.Types;
  const schema = new Schema({

    issuedBy: {
      type: ObjectId,
      ref: 'users',
    },

    book: {
      type: ObjectId,
      ref: 'book',
      required: true,
    },

    status: {
      type: Number,
      enum: [
        1, // issue requested
        2, // accept
        3, // issued
        4, // returned
        0, // cancelled
      ],
      default: 1,
    },

    issuedOn: {
      type: Date,
    },

    acceptedOn: {
      type: Date,
    },

    returnedOn: {
      type: Date,
    },

    cancelledOn: {
      type: Date,
    },

    cancellationReason: {
      type: String,
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

}
