import Ajv from "ajv";

import areaDataSchema from "../../api/area-data.schema.json"
import deviceSchema from "../../api/device.schema.json"

const ajv = new Ajv()

export const validateAreaData = ajv.addSchema(deviceSchema).compile(areaDataSchema)
