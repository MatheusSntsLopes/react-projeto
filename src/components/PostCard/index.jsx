import prop from "prop-types";
import "./styles.css";

export const PostCard = ({ cover, title, body }) => {
  return (
    <div className="post">
      <img src={cover} alt={title} />
      <div className="post-content">
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  cover: prop.string.isRequired,
  title: prop.string.isRequired,
  body: prop.string.isRequired,
};
