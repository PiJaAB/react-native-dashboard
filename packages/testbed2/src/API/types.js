// @flow

// Types of API responses

export type Scores = {|
  Volume: number,
  Quality: number,
  Resources: number,
  Leadership: number,
  Average: number,
|};

export type ScoresObj = {|
  Period: string,
  ...Scores,
|};

export type Overview = {
  periodScores: ScoresObj[],
  totalScore: ScoresObj,
};

/** Type of the Xvision/CustInfo endpoint response */
export type Customer = {
  customerName: string,
  CustNo: string,
  Summary: string,
  PrognoseInfo: string,
  CustomerContacts: string,
};
export type CustInfo = {
  Customers: Customer[],
};

/** Type of the Token/CustInfo endpoint response */
export type TokenFetch = {
  ApiToken: string,
  AuthUsername: string,
};

// Types of our data providers' states

export type Identity = {
  username: string,
  accessToken: string,
  customerId: string,
};

export type Data = {|
  overview: Overview,
  customerInfo: CustInfo,
|};
