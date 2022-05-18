module.exports = {
  ENV: "development",

  TOKEN_SECRET: "token_secret",

  TABLE_NAMES: {
    users : "users",
    organisations : "organisations",
    products : "products",
    productModeDetails : "product_mode_details",
    userOrgs : "user_orgs",
    approvals : "approvals",
    chatRoom : "chat_room",
    messages : "messages"
  },

  UPDATE_TYPES: {
    addToSet: "addToSet",
    pull: "pull",
  },

  SCHEMA_NAME: "buylend_schema",

  POSTGRES_ROLE: "postgres",

  SCHEMA_CODES: {
    "25007": "schema_and_data_statement_mixing_not_supported",
    "3F000": "invalid_schema_name",
    "42P06": "duplicate_schema",
    "42P15": "invalid_schema_definition",
    "42000": "syntax_error_or_access_rule_violation",
    "42601": "syntax_error",
  },
};
