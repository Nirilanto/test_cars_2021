import {
  get,
  post,
  requestBody,
  Request,
  RestBindings,
  ResponseObject,
  param,
} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {inject} from '@loopback/core';
import {authenticate} from '@loopback/authentication';
import {SecurityBindings} from '@loopback/security';
import {UsersRepository} from '../repositories';

var multer = require('multer');
var fs = require('fs');

/**
 * OpenAPI response for ping()
 */
const RESPONSE: ResponseObject = {
  description: 'Upload Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          message: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class UploadController {
  constructor(
    @repository(UsersRepository)
    public userRepository: UsersRepository,
    @inject(RestBindings.Http.REQUEST)
    private req: Request,
  ) {}

  // Map to `GET /upload`
  @get('/uploads', {
    responses: {
      '200': RESPONSE,
    },
  })
  upload(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      message: 'Upload file can begin',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }

  @post('/upload/{id}', {
    responses: {
      '200': RESPONSE,
    },
  })
  @authenticate('jwt')
  async uploadFile(
    @param.path.string('id') id: string,
    @requestBody.file()
    request: Request,
  ) {
    let storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        let dirPath = './public/uploads/';
        if (!fs.existsSync(dirPath)) {
          let dir = fs.mkdirSync(dirPath);
        }
        cb(null, dirPath + '/');
      },
      filename: function (req: any, file: any, cb: any) {
        cb(null, id);
      },
    });

    const upload = multer({
      dest: './public/uploads/',
      limits: {
        fields: 1,
        files: 1,
        fileSize: 512000,
      },
      storage,
    }).single('file');
    // c'est lui qui fait le boulot
    await upload(request, null);

    return {
      message: id,
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
