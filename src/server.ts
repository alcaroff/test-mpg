import Hapi from "@hapi/hapi";
import { connectCouchbase } from "./couchbase";
import { leagueRoutes } from "./league/league.routes";
import { teamRoutes } from "./team/team.routes";

const init = async () => {
  // start server
  const server = Hapi.server({
    port: 3001,
    host: "localhost",
  });
  await server.start();

  // merge and init routes
  server.route([...leagueRoutes, ...teamRoutes]);
  console.log("Server running on %s", server.info.uri);

  // connect to database
  await connectCouchbase();
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
