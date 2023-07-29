
import Keyv from "keyv";
import { KeyvFile } from "keyv-file";
import crypto from "crypto";
import type { Template } from "../../models.js";
import { HTTPError } from "../../HTTPError.js";

/**
 * To keep things simple for this project, rather than using a database, we're using a simple JSON file.
 * This is not recommended for production use, but is fine for making a test-project.
 */
const store = new Keyv({
    store: new KeyvFile({
        filename: 'data.json',
        writeDelay: 100,
        encode: v => JSON.stringify(v, undefined, 2),
        decode: JSON.parse
    })
})

function getId () {
    return crypto.randomUUID()
}

/**
 * Creates a new template in the store
 * @returns The ID of the created template
 */
export async function createTemplate ({ template }: { template: Template }) {
    const id = getId();
    await store.set(id, template)
    return id;
}

/**
 * Updates a template in the store, or creates it if it doesn't exist.
 * @returns The ID of the updated template
 */
export async function putTemplate ({ id, template }: { id: string, template: Template }) {
    await store.set(id, template)
    return id;
}


/**
 * Deletes a template from the store
 * @throws If the template is not found
 */
export async function deleteTemplate ({ id }: { id: string }) {
    const result = await store.delete(id)
    if (!result) throw new HTTPError("Template not found", 404)
    return true;
}

/**
 * Gets a template from the store
 * @returns The template
 * @throws If the template is not found
 */
export async function getTemplate ({ id }: { id: string }) {
    const template = await store.get(id)
    if (!template) throw new HTTPError("Template not found", 404)
    return template as Template;
}
