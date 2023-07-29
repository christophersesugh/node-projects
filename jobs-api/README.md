# Authentication

### User registration

|URL|https://jobsportal.cyclic.app/api/v1/auth/register|
|payload|name, email, password|
|method|POST|

### User login

|URL|https://jobsportal.cyclic.app/api/v1/auth/login|
|payload|email, password|
|method|POST|

### ME route (requires authentication)

After restration or login, the api will return a token of which you will use to make a GET request to the below URL to get a specific user's jobs, so that the user can be able to edit and delete only their jobs. A user can also add more jobs that will be related to his id.
|URL|https://jobsportal.cyclic.app/api/v1/auth/me|
|method|GET|

# Jobs API

### Fetch all users jobs (requires no authentication)

|URL|https://jobsportal.cyclic.app/api/v1/jobs|
|method|GET|

### Fetch a single job (requires no authentication)

|URL|https://jobsportal.cyclic.app/api/v1/jobs/[id]|
|method|GET|

### Create a job (requires authentication)

The default status is pending so no need to specify it.
The status can be changed to `interview` or `declined` to notify job applicants.
position: UI/UX, frontend dev, and so on.
company is the company name.
|URL|https://jobsportal.cyclic.app/api/v1/jobs|
|payload|company, position, status|
|method|POST|

### Edit a job (requires authentication)

|URL|https://jobsportal.cyclic.app/api/v1/jobs/[id]|
|payload|company, position, status|
|method|PATCH|

### Delete a job (requires authentication)

|URL|https://jobsportal.cyclic.app/api/v1/jobs/[id]|
|method|DELETE|
