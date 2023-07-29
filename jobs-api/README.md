# Authentication

### User registration

| URL                                                | payload               | method |
| -------------------------------------------------- | --------------------- | ------ |
| https://jobsportal.cyclic.app/api/v1/auth/register | name, email, password | POST   |

### User login

| URL                                             | payload         | method |
| ----------------------------------------------- | --------------- | ------ |
| https://jobsportal.cyclic.app/api/v1/auth/login | email, password | POST   |

### ME route (requires authentication)

After restration or login, the api will return a token of which you will use to make a GET request to the below URL to get a specific user's jobs, so that the user can be able to edit and delete only their jobs. A user can also add more jobs that will be related to his id.
| URL | payload | method |
| ----------------------------------------------- | --------------- | ------ |
| https://jobsportal.cyclic.app/api/v1/auth/me | null | GET |

# Jobs API

### Fetch all users jobs (requires no authentication)

| URL                                       | payload | method |
| ----------------------------------------- | ------- | ------ |
| https://jobsportal.cyclic.app/api/v1/jobs | null    | GET    |

### Fetch a single job (requires no authentication)

| URL                                            | payload | method |
| ---------------------------------------------- | ------- | ------ |
| https://jobsportal.cyclic.app/api/v1/jobs/[id] | null    | GET    |

### Create a job (requires authentication)

The default status is pending so no need to specify it.
The status can be changed to `interview` or `declined` to notify job applicants.
position: UI/UX, frontend dev, and so on.
company is the company name.
| URL | payload | method |
| ----------------------------------------- | ------------------------- | ------ |
| https://jobsportal.cyclic.app/api/v1/jobs | company, position, status | POST |

### Edit a job (requires authentication)

| URL                                            | payload                   | method |
| ---------------------------------------------- | ------------------------- | ------ |
| https://jobsportal.cyclic.app/api/v1/jobs/[id] | company, position, status | PATCH  |

### Delete a job (requires authentication)

| URL                                            | payload | method |
| ---------------------------------------------- | ------- | ------ |
| https://jobsportal.cyclic.app/api/v1/jobs/[id] | null    | DELETE |
