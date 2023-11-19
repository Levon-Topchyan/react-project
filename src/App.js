import { useEffect, useState } from "react";
import PostList from "./components/PostList";
import "./styles/App.css";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/UsePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostLoaded, setIsPostLoaded] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setIsPostLoaded(true);
    setTimeout( async () => {
 const posts = await PostService.getAll();
    setPosts(posts);
    setIsPostLoaded(false);
    },1200)
   
  };


  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        create user
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm
          createPost={(newPost) => {
            setPosts([...posts, newPost]);
            setModal(false);
          }}
        />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      {isPostLoaded ? (
      <div style={{display:'flex', justifyContent:'center', marginTop: '50px'}}><Loader/> </div> 
      ) : (
        <PostList
          posts={sortedAndSearchedPosts}
          title="Posts for JavaScript"
          onRemovePost={(post) => {
            setPosts(posts.filter((p) => p.id !== post.id));
          }}
        />
      )}
    </div>
  );
};

export default App;
