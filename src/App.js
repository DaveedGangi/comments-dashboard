import {Route,Switch} from "react-router-dom";

import { UserProfile } from "./components/userProfile";
import { CommentsDashboard } from "./components/commentsDashboard";

import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={UserProfile}/>
        <Route exact path="/comments-dashboard" component={CommentsDashboard}/>
      </Switch>

    </div>
  );
}

export default App;
