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
const userPrimitive2 = user({ _: true });
TypeIs<typeof userPrimitive2, typeof userPrimitive>("same");

const userPrimitiveFull = user({
  createTime: true,
  email: true,
  __fieldStartsWithUnderscore: true,
  ___fieldStartsWithDoubleUnderscores: true,
});
TypeIs<typeof userPrimitiveFull, PrimitiveFull<User> & UserPrototype>("same");
const userPrimitiveFull2 = user({
  _: {
    createTime: true,
    email: true,
    __fieldStartsWithUnderscore: true,
    ___fieldStartsWithDoubleUnderscores: true,
  },
});
TypeIs<typeof userPrimitiveFull2, typeof userPrimitiveFull>("same");

const userWithArticles = user({ articles: true });
TypeIs<
  typeof userWithArticles,
  Primitive<User> & UserPrototype & Record<"articles", Primitive<Article>[]>
>("same");
const userWithArticles2 = user({ _: { articles: true } });
TypeIs<typeof userWithArticles2, typeof userWithArticles>("same");

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
const userNested2 = user({
  _: {
    email: true,
    articles: { author: true, comments: { author: true } },
  },
});
TypeIs<typeof userNested2, typeof userNested>("same");
const userNested3 = user({
  email: true,
  articles: { _: { author: true, comments: { author: true } } },
});
TypeIs<typeof userNested3, typeof userNested>("same");
const userNested4 = user({
  email: true,
  articles: { _: { author: true, comments: { _: { author: { _: true } } } } },
});
TypeIs<typeof userNested4, typeof userNested>("same");

// @ts-expect-error
user({ email: { _: true } });
