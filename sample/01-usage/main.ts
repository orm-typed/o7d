import { Primitive } from "../../src/type/Primitive";
import { Fake } from "../00-common/Fake";
import { PrimitiveFull } from "../00-common/PrimitiveFull";
import { TypeIs } from "../00-common/TypeIs";
import { Article } from "./model/Article";
import { Comment, CommentPrototype } from "./model/Comment";
import { User, UserPrototype } from "./model/User";

const user = Fake<User>();

const userPrimitive = user(true);
TypeIs<typeof userPrimitive, Primitive<User> & UserPrototype>("same");

const userPrimitiveFull = user({ createTime: true, email: true });
TypeIs<typeof userPrimitiveFull, PrimitiveFull<User> & UserPrototype>("same");

const userWithArticles = user({ articles: true });
TypeIs<
  typeof userWithArticles,
  Primitive<User> & UserPrototype & Record<"articles", Primitive<Article>[]>
>("same");

const userNested = user({
  email: true,
  articles: { author: true, comments: { author: true } },
});
TypeIs<
  typeof userNested,
  Primitive<User> &
    UserPrototype &
    Record<"email", string | null> &
    Record<
      "articles",
      (Primitive<Article> &
        Record<"author", Primitive<User> & UserPrototype> &
        Record<
          "comments",
          (Primitive<Comment> &
            CommentPrototype &
            Record<"author", (Primitive<User> & UserPrototype) | null>)[]
        >)[]
    >
>("same");
