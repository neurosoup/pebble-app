export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The DateTime scalar type represents date and time as a string in RFC3339 format.
   * For example: "1985-04-12T23:20:50.52Z" represents 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
   */
  DateTime: any;
  /**
   * The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
   * Int64 can represent values in range [-(2^63),(2^63 - 1)].
   */
  Int64: any;
};
















export type AddEpicInput = {
  name: Scalars['String'];
};

export type AddEpicPayload = {
  __typename?: 'AddEpicPayload';
  epic?: Maybe<Array<Maybe<Epic>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddEpicPayloadEpicArgs = {
  filter?: Maybe<EpicFilter>;
  order?: Maybe<EpicOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddProjectInput = {
  owner: Scalars['String'];
  name: Scalars['String'];
  vision?: Maybe<Scalars['String']>;
  epics?: Maybe<Array<EpicRef>>;
};

export type AddProjectPayload = {
  __typename?: 'AddProjectPayload';
  project?: Maybe<Array<Maybe<Project>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddProjectPayloadProjectArgs = {
  filter?: Maybe<ProjectFilter>;
  order?: Maybe<ProjectOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AuthRule = {
  and?: Maybe<Array<Maybe<AuthRule>>>;
  or?: Maybe<Array<Maybe<AuthRule>>>;
  not?: Maybe<AuthRule>;
  rule?: Maybe<Scalars['String']>;
};

export type ContainsFilter = {
  point?: Maybe<PointRef>;
  polygon?: Maybe<PolygonRef>;
};

export type CustomHttp = {
  url: Scalars['String'];
  method: HttpMethod;
  body?: Maybe<Scalars['String']>;
  graphql?: Maybe<Scalars['String']>;
  mode?: Maybe<Mode>;
  forwardHeaders?: Maybe<Array<Scalars['String']>>;
  secretHeaders?: Maybe<Array<Scalars['String']>>;
  introspectionHeaders?: Maybe<Array<Scalars['String']>>;
  skipIntrospection?: Maybe<Scalars['Boolean']>;
};


export type DateTimeFilter = {
  eq?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  le?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  ge?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  between?: Maybe<DateTimeRange>;
};

export type DateTimeRange = {
  min: Scalars['DateTime'];
  max: Scalars['DateTime'];
};

export type DeleteEpicPayload = {
  __typename?: 'DeleteEpicPayload';
  epic?: Maybe<Array<Maybe<Epic>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteEpicPayloadEpicArgs = {
  filter?: Maybe<EpicFilter>;
  order?: Maybe<EpicOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeleteProjectPayload = {
  __typename?: 'DeleteProjectPayload';
  project?: Maybe<Array<Maybe<Project>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteProjectPayloadProjectArgs = {
  filter?: Maybe<ProjectFilter>;
  order?: Maybe<ProjectOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum DgraphIndex {
  Int = 'int',
  Int64 = 'int64',
  Float = 'float',
  Bool = 'bool',
  Hash = 'hash',
  Exact = 'exact',
  Term = 'term',
  Fulltext = 'fulltext',
  Trigram = 'trigram',
  Regexp = 'regexp',
  Year = 'year',
  Month = 'month',
  Day = 'day',
  Hour = 'hour',
  Geo = 'geo'
}

export type Epic = {
  __typename?: 'Epic';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type EpicAggregateResult = {
  __typename?: 'EpicAggregateResult';
  count?: Maybe<Scalars['Int']>;
  nameMin?: Maybe<Scalars['String']>;
  nameMax?: Maybe<Scalars['String']>;
};

export type EpicFilter = {
  id?: Maybe<Array<Scalars['ID']>>;
  has?: Maybe<Array<Maybe<EpicHasFilter>>>;
  and?: Maybe<Array<Maybe<EpicFilter>>>;
  or?: Maybe<Array<Maybe<EpicFilter>>>;
  not?: Maybe<EpicFilter>;
};

export enum EpicHasFilter {
  Name = 'name'
}

export type EpicOrder = {
  asc?: Maybe<EpicOrderable>;
  desc?: Maybe<EpicOrderable>;
  then?: Maybe<EpicOrder>;
};

export enum EpicOrderable {
  Name = 'name'
}

export type EpicPatch = {
  name?: Maybe<Scalars['String']>;
};

export type EpicRef = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type FloatFilter = {
  eq?: Maybe<Scalars['Float']>;
  in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  between?: Maybe<FloatRange>;
};

export type FloatRange = {
  min: Scalars['Float'];
  max: Scalars['Float'];
};

export type GenerateMutationParams = {
  add?: Maybe<Scalars['Boolean']>;
  update?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
};

export type GenerateQueryParams = {
  get?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['Boolean']>;
  aggregate?: Maybe<Scalars['Boolean']>;
};

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE'
}


export type Int64Filter = {
  eq?: Maybe<Scalars['Int64']>;
  in?: Maybe<Array<Maybe<Scalars['Int64']>>>;
  le?: Maybe<Scalars['Int64']>;
  lt?: Maybe<Scalars['Int64']>;
  ge?: Maybe<Scalars['Int64']>;
  gt?: Maybe<Scalars['Int64']>;
  between?: Maybe<Int64Range>;
};

export type Int64Range = {
  min: Scalars['Int64'];
  max: Scalars['Int64'];
};

export type IntFilter = {
  eq?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  between?: Maybe<IntRange>;
};

export type IntRange = {
  min: Scalars['Int'];
  max: Scalars['Int'];
};

export type IntersectsFilter = {
  polygon?: Maybe<PolygonRef>;
  multiPolygon?: Maybe<MultiPolygonRef>;
};

export enum Mode {
  Batch = 'BATCH',
  Single = 'SINGLE'
}

export type MultiPolygon = {
  __typename?: 'MultiPolygon';
  polygons: Array<Polygon>;
};

export type MultiPolygonRef = {
  polygons: Array<PolygonRef>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addEpic?: Maybe<AddEpicPayload>;
  updateEpic?: Maybe<UpdateEpicPayload>;
  deleteEpic?: Maybe<DeleteEpicPayload>;
  addProject?: Maybe<AddProjectPayload>;
  updateProject?: Maybe<UpdateProjectPayload>;
  deleteProject?: Maybe<DeleteProjectPayload>;
};


export type MutationAddEpicArgs = {
  input: Array<AddEpicInput>;
};


export type MutationUpdateEpicArgs = {
  input: UpdateEpicInput;
};


export type MutationDeleteEpicArgs = {
  filter: EpicFilter;
};


export type MutationAddProjectArgs = {
  input: Array<AddProjectInput>;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationDeleteProjectArgs = {
  filter: ProjectFilter;
};

export type NearFilter = {
  distance: Scalars['Float'];
  coordinate: PointRef;
};

export type Point = {
  __typename?: 'Point';
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type PointGeoFilter = {
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
};

export type PointList = {
  __typename?: 'PointList';
  points: Array<Point>;
};

export type PointListRef = {
  points: Array<PointRef>;
};

export type PointRef = {
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type Polygon = {
  __typename?: 'Polygon';
  coordinates: Array<PointList>;
};

export type PolygonGeoFilter = {
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
  contains?: Maybe<ContainsFilter>;
  intersects?: Maybe<IntersectsFilter>;
};

export type PolygonRef = {
  coordinates: Array<PointListRef>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  owner: Scalars['String'];
  name: Scalars['String'];
  vision?: Maybe<Scalars['String']>;
  epics?: Maybe<Array<Epic>>;
  epicsAggregate?: Maybe<EpicAggregateResult>;
};


export type ProjectEpicsArgs = {
  filter?: Maybe<EpicFilter>;
  order?: Maybe<EpicOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type ProjectEpicsAggregateArgs = {
  filter?: Maybe<EpicFilter>;
};

export type ProjectAggregateResult = {
  __typename?: 'ProjectAggregateResult';
  count?: Maybe<Scalars['Int']>;
  ownerMin?: Maybe<Scalars['String']>;
  ownerMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  nameMax?: Maybe<Scalars['String']>;
  visionMin?: Maybe<Scalars['String']>;
  visionMax?: Maybe<Scalars['String']>;
};

export type ProjectFilter = {
  id?: Maybe<Array<Scalars['ID']>>;
  owner?: Maybe<StringHashFilter>;
  has?: Maybe<Array<Maybe<ProjectHasFilter>>>;
  and?: Maybe<Array<Maybe<ProjectFilter>>>;
  or?: Maybe<Array<Maybe<ProjectFilter>>>;
  not?: Maybe<ProjectFilter>;
};

export enum ProjectHasFilter {
  Owner = 'owner',
  Name = 'name',
  Vision = 'vision',
  Epics = 'epics'
}

export type ProjectOrder = {
  asc?: Maybe<ProjectOrderable>;
  desc?: Maybe<ProjectOrderable>;
  then?: Maybe<ProjectOrder>;
};

export enum ProjectOrderable {
  Owner = 'owner',
  Name = 'name',
  Vision = 'vision'
}

export type ProjectPatch = {
  owner?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  vision?: Maybe<Scalars['String']>;
  epics?: Maybe<Array<EpicRef>>;
};

export type ProjectRef = {
  id?: Maybe<Scalars['ID']>;
  owner?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  vision?: Maybe<Scalars['String']>;
  epics?: Maybe<Array<EpicRef>>;
};

export type Query = {
  __typename?: 'Query';
  getEpic?: Maybe<Epic>;
  queryEpic?: Maybe<Array<Maybe<Epic>>>;
  aggregateEpic?: Maybe<EpicAggregateResult>;
  getProject?: Maybe<Project>;
  queryProject?: Maybe<Array<Maybe<Project>>>;
  aggregateProject?: Maybe<ProjectAggregateResult>;
};


export type QueryGetEpicArgs = {
  id: Scalars['ID'];
};


export type QueryQueryEpicArgs = {
  filter?: Maybe<EpicFilter>;
  order?: Maybe<EpicOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateEpicArgs = {
  filter?: Maybe<EpicFilter>;
};


export type QueryGetProjectArgs = {
  id: Scalars['ID'];
};


export type QueryQueryProjectArgs = {
  filter?: Maybe<ProjectFilter>;
  order?: Maybe<ProjectOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateProjectArgs = {
  filter?: Maybe<ProjectFilter>;
};

export type StringExactFilter = {
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  between?: Maybe<StringRange>;
};

export type StringFullTextFilter = {
  alloftext?: Maybe<Scalars['String']>;
  anyoftext?: Maybe<Scalars['String']>;
};

export type StringHashFilter = {
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type StringRange = {
  min: Scalars['String'];
  max: Scalars['String'];
};

export type StringRegExpFilter = {
  regexp?: Maybe<Scalars['String']>;
};

export type StringTermFilter = {
  allofterms?: Maybe<Scalars['String']>;
  anyofterms?: Maybe<Scalars['String']>;
};

export type UpdateEpicInput = {
  filter: EpicFilter;
  set?: Maybe<EpicPatch>;
  remove?: Maybe<EpicPatch>;
};

export type UpdateEpicPayload = {
  __typename?: 'UpdateEpicPayload';
  epic?: Maybe<Array<Maybe<Epic>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateEpicPayloadEpicArgs = {
  filter?: Maybe<EpicFilter>;
  order?: Maybe<EpicOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UpdateProjectInput = {
  filter: ProjectFilter;
  set?: Maybe<ProjectPatch>;
  remove?: Maybe<ProjectPatch>;
};

export type UpdateProjectPayload = {
  __typename?: 'UpdateProjectPayload';
  project?: Maybe<Array<Maybe<Project>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateProjectPayloadProjectArgs = {
  filter?: Maybe<ProjectFilter>;
  order?: Maybe<ProjectOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type WithinFilter = {
  polygon: PolygonRef;
};
