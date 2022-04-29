#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MultiRegionS3SourceStack } from '../lib/multi-region-s3-cmk-source-stack';
import { MultiRegionS3TargetStack } from '../lib/multi-region-s3-cmk-target-stack';

const accountId = '<202702842874>';

const app = new cdk.App();

const targetStack = new MultiRegionS3TargetStack(app, 'MultiRegionS3Target', {
  env: { account: accountId, region: 'us-east-2' },
});

const sourceStack = new MultiRegionS3SourceStack(app, 'MultiRegionS3Source', {
  env: { account: accountId, region: 'us-east-1' },
  targetBucket: targetStack.targetBucket,
  targetKeyIdSsmParameterName: targetStack.targetKeyIdSsmParameterName,
  targetRegion: targetStack.region
});

sourceStack.addDependency(targetStack);

