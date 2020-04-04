import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import AuthRoute from './routes/auth.route';
import ApiDocRoute from './routes/apidoc.route';
import validateEnv from './utils/validateEnv';
import InitiativesRoute from "./routes/initiatives.route";
import VotingRouter from "./routes/voting.route";

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new InitiativesRoute(),
  new VotingRouter(),
  new ApiDocRoute()
]);

app.listen();
