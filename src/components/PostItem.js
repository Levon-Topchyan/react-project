import React from "react";
import MyButton from "./UI/button/MyButton";

const PostItem = ({post, number, onRemovePost}) => {
  return (
    <div className="post">
      <div className="post__Content">
        <strong>{number}.  {post.title}</strong>
        <div>{post.body}</div>
      </div>
      <MyButton onClick={() => onRemovePost(post)}>remove</MyButton>
    </div>
  );
};

export default PostItem;
