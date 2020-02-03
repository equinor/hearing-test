export default {
  /*! No error occurred. The value is added to make easier usage of functions
   that take error code, but no error condition occurred. */
  AD_ERROR_SUCCEEDED: 0,

  /*! An unexpected internal error occurred. */
  AD_ERROR_UNEXPECTED: -1,

  //
  // Developer Errors
  // These errors occur from bad parameters given by the developer
  //

  /*! The method call contains one or more invalid arguments */
  AD_ERROR_DEVELOPER_INVALID_ARGUMENT: 100,

  /*! The passed in authority URL does not pass validation, if you're trying
   to use ADFS directly you must disable authority validation. */
  /*! An error was raised during the process of validating the authorization authority. */
  AD_ERROR_DEVELOPER_AUTHORITY_VALIDATION: 101,

  //
  // Server Errors
  // These errors result from interaction with or errors returned directly
  // by the server.
  //

  /*! User needs to re-authorize resource usage. This error is raised when access token cannot
   be obtained without user explicitly re-authorizing, but the developer has called
   acquireTokenSilentWithResource method. To obtain the token, the application will need to call
   acquireTokenWithResource after this error to allow the library to give user abitlity
   to re-authorize (with web UI involved). */
  AD_ERROR_SERVER_USER_INPUT_NEEDED: 200,

  /*! When work place join is required by the service. */
  AD_ERROR_SERVER_WPJ_REQUIRED: 201,

  /*! An OAuth Error was received from the server, use -protocolCode for the
   error sent by the server. */
  AD_ERROR_SERVER_OAUTH: 202,

  /*! The refresh token token was rejected by the server, use -protocoolCode for the
   error sent by the server. */
  AD_ERROR_SERVER_REFRESH_TOKEN_REJECTED: 203,

  /*! The user returned by the server does not match the the user identifier specified by
   the developer. */
  AD_ERROR_SERVER_WRONG_USER: 204,

  /*! Server redirects authentication process to a non-https url */
  AD_ERROR_SERVER_NON_HTTPS_REDIRECT: 205,

  /*! The server sent us an idtoken that we were unable to parse. */
  AD_ERROR_SERVER_INVALID_ID_TOKEN: 206,

  /*! HTTP 401 (Unauthorized) response does not contain the OAUTH2 required header */
  AD_ERROR_SERVER_MISSING_AUTHENTICATE_HEADER: 207,

  /*! HTTP 401 (Unauthorized) response's authentication header is in invalid format
   or does not contain expected values. */
  AD_ERROR_SERVER_AUTHENTICATE_HEADER_BAD_FORMAT: 208,

  /*! The logic expects the server to return HTTP_UNAUTHORIZED */
  AD_ERROR_SERVER_UNAUTHORIZED_CODE_EXPECTED: 209,

  /*! We were asked to do something that is not supported by this version of ADAL. */
  AD_ERROR_SERVER_UNSUPPORTED_REQUEST: 210,

  /*! A failure occurred while trying to get an authorization code */
  AD_ERROR_SERVER_AUTHORIZATION_CODE: 211,

  //
  // Cache Errors
  // These errors originate from a non-recoverable or ambiguous interaction
  // with the cache.
  //

  /*! Access tokens for multiple users exist in the token cache. Please specify the userId. */
  AD_ERROR_CACHE_MULTIPLE_USERS: 300,

  /*! The provided cache is from an incompatible future version of ADAL. */
  AD_ERROR_CACHE_VERSION_MISMATCH: 301,

  /*! An issue occurred while attempting to read the persisted token cache store. */
  AD_ERROR_CACHE_BAD_FORMAT: 302,

  /*! No refresh token was available in the cache */
  AD_ERROR_CACHE_NO_REFRESH_TOKEN: 303,

  //
  // UI Errors
  // These errors originate from either being unable to display the user
  // interface, or a user interaction.
  //

  /*! ADAL only supports a single interactive auth session at a time.
   The calling app should never ask for interactive auth when ADAL is in the
   middle of an interactive request */
  AD_ERROR_UI_MULTLIPLE_INTERACTIVE_REQUESTS: 400,

  /*! Failed to extract the main view controller of the application. Make sure that the application
   has UI elements. */
  AD_ERROR_UI_NO_MAIN_VIEW_CONTROLLER: 401,

  /*! Interaction (webview/broker) cannot be launched in app extension */
  AD_ERROR_UI_NOT_SUPPORTED_IN_APP_EXTENSION: 402,

  /*! The user has cancelled the applicable UI prompts */
  AD_ERROR_UI_USER_CANCEL: 403,

  /*! Interactive authentication requests must originate on the main thread. */
  AD_ERROR_UI_NOT_ON_MAIN_THREAD: 404,

  //
  // Token Broker Errors
  // These errors originate from being unable or failing to communicate with
  // the token broker (Azure Authenticator).
  //

  /*! The error code was not sent to us due to an older version of the broker */
  AD_ERROR_TOKENBROKER_UNKNOWN: 500,

  /*! The redirect URI cannot be used for invoking broker. */
  AD_ERROR_TOKENBROKER_INVALID_REDIRECT_URI: 501,

  /*! When the hash of the decrypted broker response does not match the hash
   returned from broker. */
  AD_ERROR_TOKENBROKER_RESPONSE_HASH_MISMATCH: 502,

  /*! When the application waiting for broker is activated ,without broker response. */
  AD_ERROR_TOKENBROKER_RESPONSE_NOT_RECEIVED: 503,

  /*! Failed to create the encryption key to talk to Azure Authenticator */
  AD_ERROR_TOKENBROKER_FAILED_TO_CREATE_KEY: 504,

  /*! Failed to decrypt the message we received from Azure Authenticator */
  AD_ERROR_TOKENBROKER_DECRYPTION_FAILED: 505,
};
