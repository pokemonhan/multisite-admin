// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   SERVER_URL: `./`,
//   production: false,
//   useHash: false,
//   hmr: false,
// };

export const environment = {
  SERVER_URL: `./`,
  production: false,
  useHash: false,
  hmr: false,
  envName: 'develop',
  apiBaseUrl: 'http://api.9170ttt.com',
  // apiBaseUrl: 'http://www.dev2.com',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
