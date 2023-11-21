# impacta-final-project
Repository for the final project of course of analysis and development of systems in 'Faculdade Impacta'.

To start project, install and create an express app with the following commands:

npm init
npm install
npm install express@4.16.1

To connect the app with database, install Sequelize ORM:

npm install sequelize
npm install --only=dev
npm install sequelize sequelize-cli

To create tables according to the models, run the following commands (an example for the users table) :

npx sequelize migration:generate --name create_users_table
npx sequelize db:migrate

To start connection with mysql server:
sudo mysql.server.start

To run the aplication server:
npm run start

