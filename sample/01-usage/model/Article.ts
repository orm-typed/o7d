import { ModelByFields } from "../../00-common/ModelByFields";

import { Comment } from "./Comment";
import { User } from "./User";

export interface ArticlePrimitiveFields {
  id: { type: "Int"; defaultSelected: true };
  authorId: { type: "Int"; defaultSelected: true };
  content: { type: "String"; defaultSelected: true };
  commentCountCache: { type: "Int"; defaultSelected: false };
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
