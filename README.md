
# Z-Prefix_Project

-----CSS fixes needed ------
-----Displays the data from the backend. Have to work on the user login and creation-----


## Pre-setup

Ensure you have nothing running on this projects relevant ports (:8082, :3000, :5432)
Assuming you're at this point, you've probably already cloned this from GitHub... But then again I don't know what kind of magic your up to looking at this project. So in the event you've been using magic to get around cloning this from GitHub. Please do so now and share your skills

For your backend, you'll have to make your own container and database. The docker set-up will be your lifeline. Using docker with a postgres image will make this app work beautifly. I do not recommend navtive postgres on your system. There are chance of multiple issus based on the various systems used to run this project. The container name can be pretty much anything your heart desires. However, it is crucial that you name your database 'DATABASE NAME' in order for the .env connection string to work. Also make sure you run your container within the postgres image and that your username and password match the string in the backends .env file.

 * create a postgres database in container

## Setup

1.Git clone repo: https://github.com/Bamadude31/Z-Prefix_Project.git

## Database setup (DOCKER)

2.Run docker in a terminal:

### `docker run --rm --name my_db -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`

3.Start container:

### `docker exec -it <PSQL-Container-ID> bash`

4.Connect to postgres:

### `psql -U postgres`

5.Create the database:

### `CREATE DATABASE mydatabase;`

6.Connect to database:

### `\c mydatabase`

### Within the backend folder create a .env file

1.Add the line - DB_CONNECTION_STRING=`Your specific connection string`

* Example `DB_CONNECTION_STRING=postgres://postgres:docker@localhost:5432/mydatabase`

### Cd into the local Z-Prefix_Project repo and open it

### `cd Z-Prefix_Project`

### `code .`

* Independently move within the frontend and backend folder and run this command.

### `npm i`

Follow this install with this command in the backend folder

### `npm run setup`

Finally run this command in both folders for the servers to start.

### `npm start`

now cd into frontend folder and run

### `npm start`

You can now login to an existing account such as

## Username: Jgriffin

## Password: 123

Or create a new account

* While logged in you can create an item in the create item page
  * then you will see the item in your account page and home page

* To edit the item click view details in account or home
  * click edit and adjust the fields then click save

* To delete click view details then delete
