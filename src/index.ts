import '@bogeychan/elysia-polyfills/node/index.js';
import { swagger } from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import { Template } from './models.js';
import * as templates from './external/templates/index.js';
import { processTemplate } from './actions/processTemplate.js';
import createDomPurify from 'dompurify';
import { JSDOM } from 'jsdom';
const DomPurify = createDomPurify(new JSDOM('').window);

export const app = new Elysia()
  .onError(({ error, set }) => {
    // @ts-ignore
    if ('code' in error && !isNaN(error.code)) set.status = +error.code
    return error.message
  })  
  .use(swagger({
    documentation: {
      info: {
        title: 'Templating Engine Prototype',
        version: '1.0.0',
        description: 'This application is a simple prototype of a templating engine. It allows you to pass in templates (created with Handlebars.js syntax), schemas for the data to be passed in, and logic to be run on the data before the template is processed.',
      },
    }
  }))
  .get("/", ({ set }) => {
    set.redirect = '/swagger'
  }, {
    detail: {
      deprecated: true,
      summary: 'Redirects to the Swagger UI.',
    }
  })
  .post('/templates', async ({ body }) => {
    body.template = DomPurify.sanitize(body.template)
    return templates.createTemplate({ template: body })
  }, {
    detail: {
      summary: 'Creates a new template.',
    },
    body: Template,
    response: t.String(),
  })
  .put('/templates/:id', async ({ params, body }) => {
    body.template = DomPurify.sanitize(body.template)
    return templates.putTemplate({ id: params.id, template: body })
  }, {
    detail: {
      summary: 'Updates a template by ID, or creates it if it does not exist.',
    },
    body: Template,
    response: t.String()
  })
  .delete('/templates/:id', async ({ params }) => {
    return templates.deleteTemplate({ id: params.id })
  }, {
    detail: {
      summary: 'Deletes a template by ID.',
    },
    response: {
      200: t.Boolean(),
      404: t.String({ example: 'Template not found' })
    },
  })
  .get('/templates/:id', async ({ params }) => {
    return templates.getTemplate({ id: params.id })
  }, {
    detail: {
      summary: 'Gets a template by ID.',
    },
    response: {
      200: Template,
      404: t.String({ example: 'Template not found' })
    }
  })
  .post('/templates/:id/process', async ({ params, body, set }) => {
    const template = await templates.getTemplate({ id: params.id })
    const result = processTemplate({ template, data: body })
    for(const header of template.headers ?? []) set.headers[header.name] = header.value
    return result
  }, {
    detail: {
      summary: 'Processes a template with the given data from the request body.',
    },
    body: t.Object({}, { 
      additionalProperties: true,  
      example: {
        name: 'Bogey',
        age: 20
      }
    }),
    response: {
      200: t.String(),
      400: t.String({ example: 'Invalid data: data.age should be number' }),
      404: t.String({ example: 'Template not found' })
    }
  })
  .get('/templates/:id/process', async ({ params, query, set }) => {
    const template = await templates.getTemplate({ id: params.id })
    const result = processTemplate({ template, data: query })
    for(const header of template.headers ?? []) set.headers[header.name] = header.value
    return result
  },
  {
    detail: {
      summary: 'Processes a template with the given data from the query string.',
      description: 'While Swagger UI only presents name & age as query parameters, you can pass in any data you need.',
    },
    query: t.Object({
      name: t.Optional(t.Any()),
      age: t.Optional(t.Any())
    }, {
      additionalProperties: true,
      example: {
        name: 'Bogey',
        age: 20
      }
    }),
    response: {
      200: t.String(),
      400: t.String({ example: 'Invalid data: data.age should be number' }),
      404: t.String({ example: 'Template not found' })
    }
  })
