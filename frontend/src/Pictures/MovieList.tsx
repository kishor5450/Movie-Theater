import React, { useEffect, useState } from "react";
import { Table, Button, message, Image } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

interface Movie {
  id: number; 
  name: string;
  release_date: string; 
  poster_url: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get<Movie[]>("http://localhost:9001/movies");
        setMovies(response.data);
      } catch (error) {
        message.error("Error fetching movies.");
      }
    };
    fetchMovies();
  }, []);

  const columns = [
    {
      title: "Poster",
      dataIndex: "poster_url",
      key: "poster_url",
      render: (text: string, record: Movie) => (
        <Image
          width={100}
          src={record.poster_url}
          alt={record.name} 
          placeholder={<Image preview={false} src="/loading-image.png" />}
        />
      ),
    },
    {
      title: "Movie Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Release Date",
      dataIndex: "release_date",
      key: "release_date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Movie) => (
        <>
          <Link to={`/update-movie/${record.id}`}>
            <Button type="link">Edit</Button>
          </Link>
          <Link to={`/delete-movie/${record.id}`}>
            <Button type="link" danger>
              Delete
            </Button>
          </Link>
        </>
      ),
    },
  ];

  return <Table dataSource={movies} columns={columns} rowKey="id" />;
};

export default MovieList;
