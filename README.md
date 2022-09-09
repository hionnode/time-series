Steps to run

- Clone the repo on local.
- npm i
- Add POSTGRES_STRING to .env
- node index.js

Shortcomings and what can be improved
- Validations, not done as of now but will be needed.
- Separate service(lambda or instance) for processData right now it can slow down the main server if dealing with large chunks of data.
- Message queue for processData, with retry mechanism.
- Register service for patient and org.
- Limit and better granularity on getData