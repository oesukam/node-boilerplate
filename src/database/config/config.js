{
  "development": {
    "use_env_variable": "DATABASE_URL_DEV",
    "operatorsAliases": false,
    "dialect": "postgres",
    "logging": false
  },
  "test": {
    "use_env_variable": "DATABASE_URL_TEST",
    "operatorsAliases": false,
    "dialect": "postgres",
    "logging": false
  },
  "production": {
    "logging": false,
    "use_env_variable": "DATABASE_URL_PRODUCTION",
    "operatorsAliases": false,
    "dialect": "postgres"
  }
}
