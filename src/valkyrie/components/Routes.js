import Groups from "../Groups";
import Agents from "./agents/Agents";
import Jobs from "./job/Jobs";
import Triggers from "../Triggers";
import Instances from "../Instances";
import JobInstances from "./job/JobInstances";
import Job from "./job/UpdateJob";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import JobInstance from "./job/JobInstance";
import { Typography } from "@material-ui/core";

export default props => {
  const { group } = props;
  const PageNotFound = () => (
    <Typography variant={"h1"} align={"center"}>
      {"Page Not Found"}
    </Typography>
  );
  return (
    <Switch>
      <Route path="/groups" component={Groups} />
      <Route path="/agents" component={Agents} />
      <Route path="/jobs" render={() => <Jobs group={group} />} />
      <Route path="/triggers" render={() => <Triggers group={group} />} />
      <Route path="/instances" render={() => <Instances group={group} />} />
      <Route
        path="/instance/job/list/:id"
        render={props => <JobInstances {...props} group={group} />}
      />
      <Route
        path="/job/edit/:jobId"
        render={props => <Job {...props} group={group} />}
      />
      <Route path="/instance/job/log/:jobInstanceId" component={JobInstance} />
      <Redirect from={"/"} to={"/jobs"} exact />
      <Route component={PageNotFound} />
    </Switch>
  );
};
