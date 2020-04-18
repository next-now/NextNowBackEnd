import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import AuthRoute from './routes/auth.route';
import ApiDocRoute from './routes/apidoc.route';
import validateEnv from './utils/validateEnv';
import InitiativesRoute from "./routes/initiatives.route";
import VotingRouter from "./routes/voting.route";
import HelpRequest from "./models/help-requests.model";
import HelpRequestsRoute from "./routes/help-requests.route";

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new InitiativesRoute(),
  new VotingRouter(),
  new HelpRequestsRoute(),
  new ApiDocRoute()
]);

app.listen();
