import { t, UnwrapSchema } from "elysia" 

export const Template = t.Object({
    name: t.String({
        example: 'Birthday Card'
    }),
    description: t.String({
        example: 'A card that says happy birthday.'
    }),
    template: t.String({
        example: '<b>Hello {{name}}!</b><br/> Happy {{age}}th birthday!<br/> {{turning}} is coming up soon!'
    }),
    headers: t.Optional(t.Array(t.Object({
        name: t.String(),
        value: t.String()
    }, {
        example: {
            name: 'Content-Type',
            value: 'text/html'
        }
    }))),
    dataSchema: t.Object({}, { 
        additionalProperties: true, 
        description: 'A JSON Schema that describes the data the template can receive.',
        example: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                age: { type: 'number' },
            },
            required: ['name', 'age']
        }
    }),
    logic: t.Optional(t.Object({}, {
        additionalProperties: true,
        description: 'A document with additional properties that you want to compute onto the data. JSON-Logic is passed into the keys.\nYou can read about JSON-Logic here: https://jsonlogic.com/ or https://jessemitchell.me/json-logic-engine.',
        example: {
            turning: { '+': [{ var: 'age' }, 1] }
        }
    }))
})

export type Template = UnwrapSchema<typeof Template>