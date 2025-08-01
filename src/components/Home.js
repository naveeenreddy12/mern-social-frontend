import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Ct from "../Ct";
import socket from "../socket";

const platformColors = {
  Twitter: "#1da1f2",
  Facebook: "#4267B2",
  Instagram: "linear-gradient(90deg,#fd5949 0%,#d6249f 50%,#285AEB 100%)"
};

const Home = () => {
  const { store } = useContext(Ct);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = `process.env.BACKEND_URL/getposts/${encodeURIComponent(store.platform)}`;
  const fetchPosts = () => {
    setLoading(true);
    axios.get(apiUrl, { headers: { Authorization: store.token } }).then((res) => {
      setPosts(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (store.platform && store.token) {
      fetchPosts();
    }
  }, [store.platform, store.token]);

  useEffect(() => {
    socket.on("new_post", (post) => {
      if (post.platform === store.platform) {
        setPosts(prev => [post, ...prev]);
      }
    });
    return () => socket.off("new_post");
  }, [store.platform]);

  const like = (id) => {
    axios.get(`process.env.BACKEND_URL/like/${id}`, { headers: { Authorization: store.token } })
      .then(fetchPosts);
  };
  const share = (id) => {
    axios.get(`process.env.BACKEND_URL/share/${id}`, { headers: { Authorization: store.token } })
      .then(fetchPosts);
  };
  const comment = (id) => {
    let c = prompt('Enter comment');
    if (c) {
      axios.post(`process.env.BACKEND_URL/comment/${id}`, { comment: c }, { headers: { Authorization: store.token } })
        .then(fetchPosts);
    }
  };

  if (!store.token) return <div style={{ padding: 32, textAlign: "center" }}>Please log in to view posts.</div>;

  const color = store.platform ? platformColors[store.platform] : "#eee";
  return (
    <div style={{
      maxWidth: 500, margin: "30px auto", padding: 16,
      borderRadius: 18, background: "#fff", border: `2px solid #eee`
    }}>
      <h2 style={{ textAlign: "center", marginBottom: 18, background: color, color: "#fff", padding: 10, borderRadius: 12 }}>
        {store.platform} Feed
      </h2>
      {loading && <div>Loading...</div>}
      {(!loading && posts.length === 0) && <div>No posts yet. Add your first post!</div>}
      {posts.map((post) => (
        <div key={post._id} style={{
          border: "1px solid #e8e8e8", borderRadius: 8, marginBottom: 15, padding: "12px 16px"
        }}>
          <div style={{ fontWeight: 500, marginBottom: 6 }}>{post.content}</div>
          <div style={{ color: "#999", fontSize: 13, marginBottom: 7 }}>
            Post by: {post.uid}
          </div>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <button style={{ background: "none", border: "none", color: "#1da1f2", cursor: "pointer" }}
              onClick={() => like(post._id)}>👍 {post.likes}
            </button>
            <button style={{ background: "none", border: "none", color: "#10b37c", cursor: "pointer" }}
              onClick={() => comment(post._id)}>💬 {post.comments?.length || 0}
            </button>
            <button style={{ background: "none", border: "none", color: "#9944cc", cursor: "pointer" }}
              onClick={() => share(post._id)}>🔄 {post.shared}
            </button>
          </div>
          {post.comments && post.comments.length > 0 && (
            <div style={{
              background: "#fafbfa", padding: "8px 10px", marginTop: 10, borderRadius: 6, fontSize: 14, color: "#555"
            }}>
              {post.comments.map((c, i) =>
                <div key={i} style={{ borderBottom: (i !== post.comments.length-1) ? "1px solid #eee" : "none", padding: "2px 0" }}>- {c}</div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default Home;
