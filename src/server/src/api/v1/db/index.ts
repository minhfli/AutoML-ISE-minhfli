import {DataSource} from "typeorm"
import * as schema from "../models"
import config from "../../../config/config";


export const db = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    url: config.postgresURL,
    database: "test",
    entities: [schema.User, schema.Project, schema.Run, schema.Model, schema.Dataset],
    logging: true,
    synchronize: true,
    cache: true,
    logger: "advanced-console"
})