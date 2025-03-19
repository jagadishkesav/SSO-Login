import joi from 'joi';
import dotenv from 'dotenv';
dotenv.config();

type EnvVars = {
    NODE_ENV: string;
    PORT: number;
    SESSION_SECRET: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    CALLBACK_URL: string;
};

// define validation for all the env vars
const envVarsSchema: joi.ObjectSchema<EnvVars> = joi
    .object({
        NODE_ENV: joi
            .string()
            .allow('development', 'production', 'test')
            .default('development'),
        PORT: joi.number().default(process.env.PORT),
        SESSION_SECRET: joi
            .string()
            .required()
            .description('Session secret required to sign'),
        CLIENT_ID: joi.string().required(),
        CLIENT_SECRET: joi.string().required(),
        CALLBACK_URL: joi.string().required()
    })
    .unknown()
    .required();

const { error, value: envVars } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export = {
    node_env: envVars.NODE_ENV,
    port: envVars.PORT,
    session_secret: envVars.SESSION_SECRET,
    google: {
        clientID: envVars.CLIENT_ID,
        clientSecret: envVars.CLIENT_SECRET,
        callbackURL: envVars.CALLBACK_URL
    }
};
