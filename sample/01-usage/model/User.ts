import { ModelByFields } from "../../00-common/ModelByFields";

import { Article } from "./Article";
import { Comment } from "./Comment";

export interface UserPrimitiveFields {
  id: { type: "Int"; defaultSelected: true };
  name: { type: "String"; defaultSelected: true };
  deleteTime?: { type: "DateTime"; defaultSelected: true };
  email?: { type: "String"; defaultSelected: false };
  createTime: { type: "DateTime"; defaultSelected: false };
}

export interface UserRelationFields {
  articles: Article[];
  comments: Comment[];
}

export type User = ModelByFields<
  "User",
  UserPrimitiveFields,
  UserRelationFields
>;
