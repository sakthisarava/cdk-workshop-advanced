import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { MultiRegionS3Target } from '../../multi-region-s3-target/lib/index';

export class MultiRegionS3TargetStack extends Stack {
  public targetBucket: s3.Bucket;
  public targetKeyIdSsmParameterName: string;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const myTargetConstruct = new MultiRegionS3Target(this, 'MyTarget');
    
    this.targetBucket = myTargetConstruct.targetBucket;
    this.targetKeyIdSsmParameterName = myTargetConstruct.targetKeyIdSsmParameterName;
  }
}
