import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkImage } from "../util";

const MovieCard = ({ movie }) => {
  const navigator = useNavigate();

  const imageURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const [isSafe, setIsSafe] = useState(false);

  useEffect(() => {
    checkImage(
      imageURL,
      function () {
        setIsSafe(true);
      },
      function () {
        setIsSafe(false);
      }
    );
  }, []);

  return (
    <Container
      onClick={() => navigator(`/movie/${movie.id}`, { replace: true })}
    >
      {isSafe && <img src={imageURL} alt="" />}
      <div className="text">
        <h3>{movie.original_title}</h3>
        <p>{movie.release_date}</p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  transition: border 1s ease-in-out;
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 1rem 1rem 0 0;
    cursor: pointer;
  }

  h3,
  p {
    cursor: inherit;
  }

  .text {
    padding: 1rem 0;
  }

  &:hover {
    outline: 1px solid #0d253f;
    border-radius: 1rem;
  }
`;

export default MovieCard;
