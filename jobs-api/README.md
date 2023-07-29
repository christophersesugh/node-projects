# Authentication

### User registration

|-|-|
|URL|https://jobsportal.cyclic.app/api/v1/auth/register|
|request body|name, email, password|
|method|POST|
|-|-|

### User login

|-|-|
|URL|https://jobsportal.cyclic.app/api/v1/auth/login|
|request body|email, password|
|method|POST|
|-|-|

### ME route (requires authentication)

After restration or login, the api will return a token of which you will use to make a GET request to the below URL to get a specific user's jobs, so that the user can be able to edit and delete only their jobs. A user can also add more jobs that will be related to his id.
|-|-|
|URL|https://jobsportal.cyclic.app/api/v1/auth/me|
|method|GET|
|-|-|

# Jobs API

### Fetch all users jobs (requires no authentication)

|-|-|
|URL|https://jobsportal.cyclic.app/api/v1/jobs|
|method|GET|
|-|-|

### Fetch a single job (requires no authentication)

|-|-|
|URL|https://jobsportal.cyclic.app/api/v1/jobs/[id]|
|method|GET|
|-|-|
