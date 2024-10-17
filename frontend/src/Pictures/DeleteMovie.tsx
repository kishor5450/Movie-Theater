import React, { useEffect } from "react";
import { Button, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteMovie = async () => {
      try {
        await axios.delete(`http://localhost:9001/movies/${id}`);
        message.success("Movie deleted successfully.");
        navigate("/movies"); 
      } catch (error) {
        message.error("Error deleting movie.");
        console.error("Error deleting movie:", error); 
      }
    };

    if (id) {
      deleteMovie();
    }
  }, [id, navigate]);

  return <Button loading>Deleting Movie...</Button>;
};

export default DeleteMovie;
