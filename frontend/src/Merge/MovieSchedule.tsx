import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Select, DatePicker, Button, message } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface MovieScheduleDialogProps {
  visible: boolean;
  onClose: () => void;
  onMovieScheduled: (movie: any) => void;
  theaterId: number | null;
}

const MovieScheduleDialog: React.FC<MovieScheduleDialogProps> = ({
  visible,
  onClose,
  onMovieScheduled,
  theaterId,
}) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [theater, setTheater] = useState<any | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:9001/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await axios.get(`http://localhost:9001/theaters/${theaterId}`);
        setTheater(response.data);
      } catch (error) {
        console.error("Failed to fetch theater:", error);
      }
    };
    if (theaterId) {
      fetchTheater();
    }
  }, [theaterId]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const selectedMovie = movies.find((movie) => movie.id === values.movie);
      

      if (!theater) {
        message.error("Theater data is not available.");
        return;
      }

      const startDate = values.dateRange[0].format("YYYY-MM-DD");
      const releaseDate = moment(selectedMovie.release_date).format("YYYY-MM-DD");

      if (moment(startDate).isBefore(releaseDate)) {
        message.error(`Cannot schedule the movie before its release date of ${releaseDate}.`);
        return;
      }

      const scheduleData = {
        theater_id: theater.id,
        movie_id: selectedMovie.id,
        theater_name: theater.name,
        movie_name: selectedMovie.name,
        start_date: startDate,
        end_date: values.dateRange[1].format("YYYY-MM-DD"),
      };

      console.log("Schedule Data:", scheduleData);

      await axios.post("http://localhost:9001/theaters-movies", scheduleData);

      message.success("Movie scheduled successfully!");
      onMovieScheduled(selectedMovie);
      onClose();
      navigate('/')
    } catch (error) {
      const axiosError = error as { response?: { data: { message: string } } };

      if (axiosError.response) {
        console.error("Error response:", axiosError.response.data);
        message.error(`Failed to schedule movie: ${axiosError.response.data.message}`);
      } else {
        console.error("Error:", error);
        message.error("Failed to schedule movie. Please try again.");
      }
    }
   
  };

  return (
    <Modal
      title={`Schedule a Movie for ${theater?.name || "Theater"}`}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Select Movie"
          name="movie"
          rules={[{ required: true, message: "Please select a movie" }]}
        >
          <Select placeholder="Select a movie">
            {movies.map((movie) => (
              <Option key={movie.id} value={movie.id}>
                {movie.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Date Range"
          name="dateRange"
          rules={[{ required: true, message: "Please select a date range" }]}
        >
          <RangePicker
            disabledDate={(current) => current && current < moment().endOf("day")}
            format="YYYY-MM-DD"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MovieScheduleDialog;
