import {Sequelize} from 'sequelize-typescript';
import User from './users.model';
import Initiative from "./initiative.model";
import Vote from "./votes.model";
import Transaction from "./transaction.model";
import Category from "./categories.model";
import UserCategory from "./users-categories.model";
import HelpRequest from "./help-requests.model";
import HelpRequestCategory from "./helprequests-categories.model";

export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_PATH,
    dialect: 'mysql',
    timezone: '+01:00',
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
    pool: {
      min: 0,
      max: 30,
      idle: 10000,
      acquire: 30000,
    },
  },
);

sequelize.addModels([User, Initiative, Vote, Transaction, Category, UserCategory, HelpRequest, HelpRequestCategory]);

sequelize.authenticate().catch((err: Error) => {
  console.error('Unable to connect to the database:', err);
});
