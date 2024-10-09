# DevTinder APIs

Authentication related APIs

# authRouter

- POST /signup
- POST/login
- POST/logout

Profile related APIs

# profileRouter

- GET/profile/view
- PATCH/profile/edit
- PATCH/forgotPassword

Connection related APIs

# connectionRequestRouter

- POST/request/send/interested/:userID
- POST/request/send/ignore/:userID
- POST /request/review/accepted/:requestID
- POST /request/review/rejected/:requestID

# userRouter

- GET /user/connections
- GET /user/feed - Gets you the profile of other users
- GET /user/requests/
