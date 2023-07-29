
import type { Template } from "../models.js";
import Ajv from "ajv";
// @ts-ignore
import { LogicEngine } from 'json-logic-engine'
import { HTTPError } from "../HTTPError.js";
import Handlebars from "handlebars";

const engine = new LogicEngine() 
engine.addMethod('sum', (data: any) => {
    return data.reduce((a: number, b: number) => a + b, 0)
})

/**
 * Processes a template with the given data.
 * @throws If the data is invalid
 * @returns The processed template
 * 
 * If the template has logic, it will be run on the data before the template is processed.
 * This could be optimized by caching the compiled template, but for simplicity, we're not doing that here.
 */
export async function processTemplate ({ template, data }: { template: Template, data: any}) {
    const ajv = new Ajv.default({ coerceTypes: true })
    const validate = ajv.compile(template.dataSchema)
    const valid = validate(data)
    if (!valid) throw new HTTPError(`Invalid data: ${ajv.errorsText(validate.errors)}`, 400)
    if (template.logic) data = { ...data, ...engine.run({ eachKey: template.logic }, data) }
    return Handlebars.compile(template.template)(data)
}