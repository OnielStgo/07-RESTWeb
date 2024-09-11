import 'dotenv/config'

import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PAHT: get('PUBLIC_PAHT').default('public').asString(),
}