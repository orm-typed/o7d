import { Primitive } from "../../src/type/Primitive";
import { PrimitiveFull } from "../../src/type/PrimitiveFull";
import { Fake } from "../00-common/Fake";
import { TypeIs } from "../00-common/TypeIs";
import { Article } from "./model/Article";
import { Comment } from "./model/Comment";
import { User } from "./model/User";

const User = Fake<User>();

const userPrimitive = User(true);
TypeIs<typeof userPrimitive, Primitive<User>>("same");

const userPrimitiveFull = User({ createTime: true, email: true });
TypeIs<typeof userPrimitiveFull, PrimitiveFull<User>>("same");

const userWithArticles = User({ articles: true });
TypeIs<
  typeof userWithArticles,
  Primitive<User> & Record<"articles", Primitive<Article>[]>
>("same");

const userNested = User({
  email: true,
  articles: { author: true, comments: { author: true } },
});
TypeIs<
  typeof userNested,
  Primitive<User> &
    Record<"email", string | null> &
    Record<
      "articles",
      (Primitive<Article> &
        Record<"author", Primitive<User>> &
        Record<
          "comments",
          (Primitive<Comment> & Record<"author", Primitive<User> | null>)[]
        >)[]
    >
>("same");
