import React from "react";
import "./RecentPost.css";
// import data from "../../Pages/Recipes/RecipesData";

const RecentPost = () => {
  return (
    <section className="post-section">
      <h4 className="subsection-title">Recent Posts</h4>
      <div className="post-center">
        {/* {data.map((item) => {
          return (
            <div key={item.id} className="post-item">
              <h4 className="post-title">{item.title}</h4>
              <img className="post-img" src={item.image} alt={item.title} />
            </div>
          ); */}
        })}
      </div>
    </section>
  );
};

export default RecentPost;
