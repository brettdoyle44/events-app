import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Key: {
      userid: event.requestContext.identity.cognitoIdentityId,
      eventid: event.pathParameters.id
    },
    UpdateExpression:
      'SET content = :content, image = :image, title = :title, startDate = :startDate',
    ExpressionAttributeValues: {
      ':image': data.image || null,
      ':content': data.content || null,
      ':title': data.title || null,
      ':startDate': data.startDate || null
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    await dynamoDbLib.call('update', params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
