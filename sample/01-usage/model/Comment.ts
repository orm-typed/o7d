import { FakeBase } from "../../../src/FakeBase";
import { ModelDefinition } from "../../../src/type/ModelDefinition";
import { ModelByFields } from "../../00-common/ModelByFields";

import { Article } from "./Article";
import { User } from "./User";

export interface CommentPrimitiveFields {
  id: { type: "Int"; defaultSelected: true };
  articleId: { type: "Int"; defaultSelected: true };
  authorId?: { type: "Int"; defaultSelected: true };
  content: { type: "String"; defaultSelected: true };
}

export interface CommentRelationFields {
  article: Article;
  author?: User;
}

export type Comment = ModelByFields<
  "Comment",
  CommentPrimitiveFields,
  CommentRelationFields
> & {
  extraPrototype: CommentPrototype;
};

export class CommentPrototype extends FakeBase<CommentPrimitiveFields>() {
  get isFromAnonymous() {
    return this.authorId === null;
  }
}

export const Comment: ModelDefinition<Comment> = {
  primitiveFields: {
    id: { type: "Int", defaultSelected: true },
    articleId: { type: "Int", defaultSelected: true },
    authorId: { type: "Int", defaultSelected: true, nullable: true },
    content: { type: "String", defaultSelected: true },
  },
  relationFields: {
    article: {
      type: "n:1 - this reference",
      model: Article,
      thisFields: ["articleId"],
      othersFields: ["id"],
    },
    author: {
      type: "1:1 - this reference",
      model: User,
      thisFields: ["authorId"],
      othersFields: ["id"],
    },
  },
  prototype: CommentPrototype,
};
