import { Post } from "./Post";
import { Container } from "./Container";
import { ErrorPage, LoadingPage } from "../pages";
import { useLocalStorage } from "../storage";
import { useEffect, useMemo, useState } from "react";
import { getPosts } from "../api/posts";
import { PostsSkeleton } from "./PostsSkeleton";
import { PostsNotFound } from "./PostsNotFound";

export const Posts = ({ page, type, status, setStatus, view, search }) => {
  const [setItem] = useLocalStorage();
  const [posts, setPosts] = useState([]);

  const finalPosts = useMemo(() => {

    let result 

    if (!search.length) {
      result = posts
    }

    if (search.length) {
      result = posts.slice().filter((post) => {
        return post.title.includes(search.toLowerCase())
      });
    }



    if (type.length) {
      result = result.sort((secondPost, firstPost) => {
        if (type === "asc") {
          return secondPost.title.localeCompare(firstPost.title);
        }

        if (type === "desc") {
          return firstPost.title.localeCompare(secondPost.title);
        }
      });
    }

    if (search.length || type.length) {
      return result?.length ? result : posts
    }

    return posts;
  }, [type, posts, search]);


  useEffect(() => {
    setStatus((prev) => ({
      ...prev,
      loading: true,
    }));
    getPosts(page)
      .then(({ data }) => {
        setPosts(data);
        setItem("posts", data);
      })
      .catch((err) => {
        setStatus((prev) => ({
          ...prev,
          error: true,
          message: err.message,
        }));
      })
      .finally(() => {
        setStatus((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  }, [page]);

  if (status.error) {
    return (
      <Container>
        <ErrorPage message={status.message} />
      </Container>
    );
  }
  return (
    <div className={`${view === "list" ? "posts-list" : "posts-table"}`}>
      {status.loading ? (
        <LoadingPage>
          <PostsSkeleton />
        </LoadingPage>
      ) : (
        <>
          {
          finalPosts.length
          ?
          (
            finalPosts.map((post) => <Post key={post.id} {...post} />)
          )
          :
          (
            <LoadingPage >
              <PostsNotFound page={page}/>
            </LoadingPage>
          )}
        </>
      )}
    </div>
  );
};
