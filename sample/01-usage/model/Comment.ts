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
>;
