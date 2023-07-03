import { serverConfig } from "./server-webpack.part";

import { commonConfig } from "./webpack.common";

export default [/** server  **/ { ...commonConfig, ...serverConfig }];
