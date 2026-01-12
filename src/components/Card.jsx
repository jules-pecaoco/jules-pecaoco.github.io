import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import "../css/_Card.css";

const Card = (props) => {
  const { title, description, img, technologies, scrollY, links, live, rev } = props;
  const [scroll, setScroll] = useState(false);

  return (
    <div className="card" style={{ flexDirection: rev ? "row-reverse" : "row" }}>
      <div className="c__img">
        {img ? (
          <img
            src={img}
            alt={title}
            style={{
              transform: scroll ? `translateY(${scrollY})` : "translateY(0%)",
              transition: "transform 10s ease-in-out",
            }}
            onMouseEnter={() => setScroll(true)}
            onMouseLeave={() => setScroll(false)}
          />
        ) : (
          <div className="c__img-placeholder">
            <h3>{title}</h3>
          </div>
        )}
      </div>
      <div className="c__content">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="c__tech">{technologies && technologies.map((tech, index) => <span key={index}>{tech}</span>)}</div>
        <div className="c__btn">
          <a href={links.github} target="_blank" rel="noopener noreferrer">
            <span>Code</span>
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href={links.live} style={{ display: live ? "block" : "none" }} target="_blank" rel="noopener noreferrer">
            <span>Live</span>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="live" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
