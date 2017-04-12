# UserDashboardAPI
A API to provide user's ddata to fullfill an interactive dashboard

## Setup Instructions:

make sure to have `yarn` and `cross-env` installed for better performance/testing

1. Clone this repository `git clone http://github.com/Agezao/UserDashboardAPI
2. Run `yarn install`
3. Edit `config` files
4. run `npm run build`
5. run `npm test`
6. If everything went well, the compiled production files will be at /dist/
7. Or, start the server with `npm start`

## API Routing:

1. GET:  /topActiveUsers?page={pageNumber}
2. GET:  /users?id={user.id}
3. POST: /users

## Test Results:

For your `npm test` results, you should be expecting something like this as a positive test-run:
<img src="http://i.imgur.com/MbexBmo.png" />
