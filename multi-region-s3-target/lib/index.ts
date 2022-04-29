import { Construct } from 'constructs';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ssm from 'aws-cdk-lib/aws-ssm';

export class MultiRegionS3Target extends Construct {
  public readonly targetBucket: s3.Bucket;
  public readonly targetKeyIdSsmParameterName: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const targetKmsKey = new kms.Key(this, 'MyTargetKey');

    const targetBucket = new s3.Bucket(this, 'MyTargetBucket', {
      bucketName: cdk.PhysicalName.GENERATE_IF_NEEDED,
      encryption: s3.BucketEncryption.KMS,
      encryptionKey: targetKmsKey,
      versioned: true
  });
  
     const stack = cdk.Stack.of(this);
     const parameterName = `${stack.stackName}.MyTargetKeyId`;
  
     new ssm.StringParameter(this, 'MyTargetKeyIdSSMParam', {
     parameterName: parameterName,
     description: 'The KMS Key Id for the target stack',
     stringValue: targetKmsKey.keyArn
  });

    this.targetBucket = targetBucket;
    this.targetKeyIdSsmParameterName = parameterName;
  
  
  }
}
