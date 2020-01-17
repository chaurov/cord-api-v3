#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {CordApiV3Stack} from '../lib/cord-api-v3-stack';

const app = new cdk.App();
new CordApiV3Stack(app, 'CordApiV3Stack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
});