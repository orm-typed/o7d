import { ModelDefinition } from "../../../src/type/ModelDefinition";
import { ModelByFields } from "../../00-common/ModelByFields";

import { Comment } from "./Comment";
import { User } from "./User";

export interface ArticlePrimitiveFields {
  id: { type: "Int"; defaultSelected: true };
  authorId: { type: "Int"; defaultSelected: true };
  content: { type: "String"; defaultSelected: true };
  viewCount: { type: "Int"; defaultSelected: false };
}

export interface ArticleRelationFields {
  author: User;
  comments: Comment[];
}

export type Article = ModelByFields<
  "Article",
  ArticlePrimitiveFields,
  ArticleRelationFields
>;

export const Article: ModelDefinition<Article> = {
  primitiveFields: {
    id: { type: "Int", defaultSelected: true },
    authorId: { type: "Int", defaultSelected: true },
    content: { type: "String", defaultSelected: true },
    viewCount: { type: "Int" },
  },
  relationFields: {
    author: {
      type: "n:1 - this reference",
      model: User,
      thisFields: ["authorId"],
      othersFields: ["id"],
    },
    comments: {
      type: "1:n - other references",
      model: Comment,
      thisFields: ["id"],
      othersFields: ["articleId"],
    },
  },
};
