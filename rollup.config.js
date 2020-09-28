import babel from "rollup-plugin-babel";
import html from "@rollup/plugin-html";
import liveServer from "rollup-plugin-live-server";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "rollup-plugin-json";
import { name, version } from "./package.json";
const mode = process.env.NODE_ENV;

const banner = `/*!
 * ${name}.js ${version}
 * Build in ${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}  FFET
 */`;

const outputs = [
  {
    file: "dist/index.js",
    banner,
    format: "umd",
    name: "fffutil",
  },
  {
    file: "es/index.js",
    format: "es",
    banner,
  },
  {
    file: "lib/index.js",
    format: "cjs",
  },
].map((i) => {
  i.sourcemap = mode !== "production";
  return i;
});

const config = outputs.map((output, i) => {
  return {
    input: "src/index.js",
    output,
    //   external: ["lodash"],
    plugins: [
      json(),
      babel({
        exclude: "node_modules/**",
      }),
      mode !== "production" && html(),
      resolve(),
      commonjs(),
      mode === "production" &&
        terser({
          compress: { warnings: false, drop_console: false, unused: true },
          output: {
            comments: /fffutil/i,
          },
        }),
      mode !== "production" &&
        liveServer({
          port: 3000,
          root: "dist",
          file: "index.html",
          open: false,
          wait: 500,
        }),
    ],
  };
});

export default config;
