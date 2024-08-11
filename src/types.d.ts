declare namespace NodeJS {
  // @ts-expect-error - This is a hack to allow us to add our own types to the NodeJS global object
  type ProcessEnv = {
    JWT_SECRET: string
    NODE_DOCKER_PORT: string
  }
}
