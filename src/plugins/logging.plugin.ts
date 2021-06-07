import { Plugin } from '@nestjs/graphql';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';

// This could be extended to log users, execution times or whatever, Just logging accesses and errors for now
// External process running this process (e.g. kubernetes) could pick standard output of this process and forward it to logging storage, connect it with analytics etc
@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  requestDidStart({ logger, request }): GraphQLRequestListener {
    logger.info('Request started at ', new Date());
    logger.info(`Query: ${request.query}`);
    return {
      didEncounterErrors({ logger, errors }) {
        for (const error of errors) {
          logger.error(error);
        }
      },
    };
  }
}
