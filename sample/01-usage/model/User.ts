import { FakeBase } from "../../../src/FakeBase";
import { ModelDefinition } from "../../../src/type/ModelDefinition";
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
> & {
  extraPrototype: UserPrototype;
};

export class UserPrototype extends FakeBase<UserPrimitiveFields>() {
  get isDeleted() {
    return !!this.deleteTime;
  }
}

export const User: ModelDefinition<User> = {
  primitiveFields: {
    id: { type: "Int", defaultSelected: true },
    name: { type: "String", defaultSelected: true },
    deleteTime: { type: "DateTime", defaultSelected: true, nullable: true },
    email: { type: "String", nullable: true },
    createTime: { type: "DateTime" },
  },
  relationFields: {
    articles: {
      type: "1:n - other references",
      model: Article,
      thisFields: ["id"],
      othersFields: ["authorId"],
    },
    comments: {
      type: "1:n - other references",
      model: Comment,
      thisFields: ["id"],
      othersFields: ["authorId"],
    },
  },
  prototype: UserPrototype,
};
