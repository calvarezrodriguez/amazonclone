// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ApiEndpoint: 'http://localhost:3030/api/',
  Address: 'accounts/address/',
  Login: 'accounts/login/',
  Singup: 'accounts/singup/',
  Profile: 'accounts/profile/',
  Categories: 'categories/',
  Products: 'seller/products',
  Product: 'products/',
  Review: 'review/',
  Search: 'search?query=',
  Payment: 'payment',
  Orders: 'accounts/orders/',
  StripeKey:
    'pk_test_51GwsnKCAbClsdLY01sKZ5DYP9sxFYtokZI5HsQqawqGMYtSFMGqu7Z6MtXNTnFUhlfwdIgaspHNfyRIFjl7cfLnj00eebVBtPR',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
