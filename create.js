import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      userid: event.requestContext.identity.cognitoIdentityId,
      eventid: uuid.v1(),
      title: data.title,
      content: data.content,
      startDate: data.startDate,
      image: data.image,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
