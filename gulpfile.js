"use strict";

const gulp = require("gulp");
const build = require("@microsoft/sp-build-web");

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
build.addSuppression(
    'Warning - [package-solution] This is not a production build (--ship or --production), therefore the "includeClientSideAssets" setting will be ignored.'
);

build.initialize(gulp);
