import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Image } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Movie {
  NAME: string;
  release_date: string;
  poster_url: string;
}

const UpdateMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [posterUrl, setPosterUrl] = useState<string>("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get<Movie>(`http://localhost:9001/movies/${id}`);
        form.setFieldsValue(response.data);
        setPosterUrl(response.data.poster_url); 
      } catch (error) {
        message.error("Error fetching movie data.");
      }
    };
    fetchMovie();
  }, [id, form]);

  const onFinish = async (values: Movie) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:9001/movies/${id}`, {
        ...values,
        poster_url: values.poster_url, 
      });
      message.success("Movie updated successfully!");
    } catch (error) {
      message.error("Error updating movie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {posterUrl && (
        <Image
          width={100}
          src={posterUrl}
          alt="Poster"
          style={{ marginBottom: "16px" }}
        />
      )}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="NAME" label="Movie Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="release_date"
          label="Release Date"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="poster_url"
          label="Poster URL"
          rules={[{ required: true }]}
        >
          <Input onChange={(e) => setPosterUrl(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Movie
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateMovie;
