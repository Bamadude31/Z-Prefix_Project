
---

## Z-Prefix_Project

## Pre-setup
Before starting, ensure that there are no processes running on the relevant ports for this project (port numbers: 8082, 3001, 5432).

Assuming you've already cloned this project from GitHub, if not, please clone it now using the following command:

```
git clone https://github.com/Bamadude31/Z-Prefix_Project.git
```

For the backend, you'll need to create your own container and database using Docker. Here's how you can set it up:


## Database Setup (DOCKER)
To set up the database, use Docker witha PostgreSQL image. Afterwards, follow these steps:

1. Run Docker in a terminal:
   ```
   docker run --rm --name my_db -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
   ```

2. Start the container:
   ```
   docker exec -it <PSQL-Container-ID> bash
   ```

3. Connect to PostgreSQL:
   ```
   psql -U postgres
   ```

4. Create the database:
   ```
   CREATE DATABASE mydatabase;
   ```

5. Connect to the database:
   ```
   \c mydatabase
   ```

After setting up the database, create a .env file within the backend folder and add the following line:
```
DB_CONNECTION_STRING=Your specific connection string
```
Example:
```
DB_CONNECTION_STRING=postgres://postgres:docker@localhost:5432/mydatabase
```
## App Setup (REACT // NODE)

To access all of the following commands, ensure that you open a terminal in the folder that you saved the repo into.

1. Now, navigate to the local Z-Prefix_Project repository and open it using the following commands:
```
cd Z-Prefix_Project
code .
```

2. Move independently within the frontend and backend folders and run the following command in each folder:
```
npm i
```

3. Follow this install with the command below in the backend folder:
```
npm run setup
npm start
```

This will get the data from your migrations and seeds loaded into the Database. this will be followed by loading of the server.

4. Finally, run the following command in the frontend folder to start the server:
```
npm start
```
You can now log in to an existing account using the following credentials:
- Username: Jgriffin
- Password: 123

Alternatively, you can create a new account. Once logged in, you can perform the following actions:
- Create an item on the "create item" page, which will then appear on your account page and the home page.
- Edit an item by clicking "view details" on the account or home page, then clicking "edit," making your adjustments, and clicking "save."
- Delete an item by clicking "view details" and then "delete."

---