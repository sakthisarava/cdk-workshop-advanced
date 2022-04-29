import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { MultiRegionS3Source } from '../../multi-region-s3-source/lib/index';

interface S3StaticMultiRegionSourceStackProps extends cdk.StackProps {
  targetBucket: s3.Bucket,
  targetKeyIdSsmParameterName: string,
  targetRegion: string
}

export class MultiRegionS3SourceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: S3StaticMultiRegionSourceStackProps) {
    super(scope, id, props);
    
    const myTargetConstruct = new MultiRegionS3Source(this, 'MySource', {
      targetBucket: props.targetBucket,
      targetKeyIdSsmParameterName: props.targetKeyIdSsmParameterName,
      targetRegion: props.targetRegion
    });
  }
}