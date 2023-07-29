# Test Application with Node.js runtime

This application is a simple prototype of a templating engine. It allows you to pass in templates (created with Handlebars.js syntax), schemas for the data to be passed in, and logic to be run on the data before the template is processed.

Given the following template:
```json
{
  "name": "Birthday Card",
  "description": "A card that says happy birthday.",
  "template": "<b>Hello {{name}}!</b><br/> Happy {{age}}th birthday!<br/> {{turning}} is coming up soon!",
  "headers": [
    {
      "name": "Content-Type",
      "value": "text/html"
    }
  ],
  "dataSchema": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "age": {
        "type": "number"
      }
    },
    "required": [
      "name",
      "age"
    ]
  },
  "logic": {
    "turning": {
      "+": [
        {
          "var": "age"
        },
        1
      ]
    }
  }
}
```

And the following data:
```json
{
  "name": "John",
  "age": 30
}
```

The following output would be generated:
```html
<b>Hello John!</b><br/> Happy 30th birthday!<br/> 31 is coming up soon!
```

The engine allows you to create multiple templates, and add schemas and logic to each one. 

## Getting Started

```bash
yarn
```
This will install the necessary dependencies


To start the development server run:
```bash
yarn run dev
```

Open http://localhost:6250/swagger with your browser to see the result. 

This will present you with a Swagger UI to test the API manually and provide you with the API documentation.

## Your Task

Hey! Thank you for taking the time to consider this coding challenge. We really appreciate it!

Your task is to test the API and write automated tests for it. You can use any testing framework you like (Newman, Cucumber, Jest, whatever you feel is appropriate)!

The goals are to:

- Ensure that each API is working as expected.
- Ensure that each API is returning the correct response codes & errors when necessary.
- Ensure that if headers are supplied to the template, they are returned in the response. (Like the Content-Type header in the example above, useful for things like SVGs)
- Ensure that the logic is being applied correctly to the data before the template is processed. (Like the "turning" logic in the example above)
- Ensure that the data is being validated against the schema before the template is processed. (Like the "dataSchema" in the example above)
- Bonus: Check to see if there is an XSS vulnerability. See if you can add JavaScript to the template and have it execute.

Some resources that may be helpful, but are not necessary to use the examples provided:
- https://json-schema.org/
- https://handlebarsjs.com/
- https://jsonlogic.com/

You can use the examples provided in the `examples` folder to test the API.
- [receipt.md](examples/receipt.md)
- [icon.md](examples/icon.md)
- [birthday.md](examples/birthday.md)

You are also encouraged to create your own examples to test the API with.

You are encouraged to fork this repository. 