import { Primitive } from "../../src/type/Primitive";
import { Fake } from "../00-common/Fake";
import { PrimitiveFull } from "../00-common/PrimitiveFull";
import { TypeIs } from "../00-common/TypeIs";
import { Article } from "./model/Article";
import { Comment } from "./model/Comment";
import { User, UserPrototype } from "./model/User";

const User = Fake<User>();

const userPrimitive = User(true);
TypeIs<typeof userPrimitive, Primitive<User> & UserPrototype>("same");

const userPrimitiveFull = User({ createTime: true, email: true });
TypeIs<typeof userPrimitiveFull, PrimitiveFull<User> & UserPrototype>("same");

const userWithArticles = User({ articles: true });
TypeIs<
  typeof userWithArticles,
  Primitive<User> & UserPrototype & Record<"articles", Primitive<Article>[]>
>("same");

const userNested = User({
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
            Record<"author", (Primitive<User> & UserPrototype) | null>)[]
        >)[]
    >
>("same");
