import { Configuration, RuleSetRule } from "webpack";

export const tsRuleBase: RuleSetRule = {
  test: /\.ts$/i,
  loader: "ts-loader",
};

export const commonConfig: Configuration = {
  mode: "production",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
};
