import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AddMovieFormValues {
  NAME: string;
  release_date: string;
  poster_url: string;
}

const AddMovie: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()

  const onFinish = async (values: AddMovieFormValues) => {
    try {
      const response = await axios.post("http://localhost:9001/movies", [
        {
          NAME: values.NAME,
          release_date: values.release_date,
          poster_url: values.poster_url,
        },
      ]);
      message.success("Movie added successfully!");
      form.resetFields();
      navigate('/')
    } catch (error) {
      message.error("Error adding movie.");
      console.error("Error adding movie:", error); 
    }
  };

  return (
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
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Movie
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddMovie;
