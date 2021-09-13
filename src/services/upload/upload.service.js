// Initializes the `upload` service on path `/upload`
import {Upload} from './upload.class';

import createModel from '../../models/upload.model';
import hooks from './upload.hooks';

import multer from 'multer';
import fs from 'fs';
import moment from 'moment';

export default function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  let storage = multer.memoryStorage();
  let upload = multer({ storage });

  const checkDirectory = async (path) => {
    try {
      return fs.statSync(path);
    } catch (e) {
      return false;
    }
  };

  // Initialize our service with any options it requires
  app.use('/upload', upload.any(), async function (req, res, next) {
    // console.log(req);
    // get all files.
    const files = req.files;
    // console.log(files);

    if (!files || !files.length) {
      req.body = {
        result: false,
        message: 'Please upload files.'
      };
      next();
    } else {
      try {
        let path = 'public/uploads';
        let currentYear = moment().year();
        let currentMonth = moment().month() + 1;
        let currentDate = moment().date();

        let yearDirectoryPath = `${path}/${currentYear.toString()}`;

        let yearDirectory = await checkDirectory(yearDirectoryPath);

        if (!yearDirectory) {
          fs.mkdirSync(yearDirectoryPath);
        }

        let monthDateDirectoryPath = `${yearDirectoryPath}/${currentMonth}_${currentDate}`;
        let monthDirectory = await checkDirectory(monthDateDirectoryPath);

        if (!monthDirectory) {
          fs.mkdirSync(monthDateDirectoryPath);
        }

        let filePaths = [];

        for (const each of files) {
          let { originalname, buffer } = each;

          let filePath = `${monthDateDirectoryPath}/${moment().valueOf()}_${originalname}`;

          fs.writeFileSync(filePath, buffer);

          filePath = `http://${req.feathers.headers.host}/${filePath.replace('public/uploads', 'uploads')}`;

          filePaths.push(filePath);
        }

        req.body = {
          ...req.body,
          result: true,
          links: filePaths
        };

        next();

      } catch (e) {
        req.body = {
          result: false,
          message: e.message,
        };
        next();
      }


    }
  }, new Upload(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('upload');

  service.hooks(hooks);
}
