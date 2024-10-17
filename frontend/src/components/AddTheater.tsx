import React, { useState, useRef } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { InputRef } from "antd/es/input"; 
import SeatLayout from "./SeatLayout";
import "./styles/addtheater.css";


interface AddTheaterProps {
  setTheater: React.Dispatch<React.SetStateAction<any>>;
  setData: React.Dispatch<React.SetStateAction<any>>;
  setSeatData: React.Dispatch<React.SetStateAction<any>>;
  setNonData: React.Dispatch<React.SetStateAction<any>>;
}

const AddTheater: React.FC<AddTheaterProps> = ({
  setTheater,
  setData,
  setSeatData,
  setNonData,
}) => {
  const [name, setName] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [rows, setRows] = useState<string>("");
  const [columns, setColumns] = useState<string>("");
  const [nonSeatingSpaces, setNonSeatingSpaces] = useState<string>("");
  const [showSeatLayout, setShowSeatLayout] = useState<boolean>(false);

  const areaRef = useRef<InputRef>(null);
  const cityRef = useRef<InputRef>(null);
  const rowsRef = useRef<InputRef>(null);
  const columnsRef = useRef<InputRef>(null);
  const nonSeatingSpacesRef = useRef<InputRef>(null);

  const handleKeyDown = (e: React.KeyboardEvent, nextFieldRef: React.RefObject<InputRef | null>) => {
    if (e.key === "Enter" && nextFieldRef.current) {
      e.preventDefault();
      nextFieldRef.current.focus();
    }
  };

  const handleView = () => {
    if (name && area && city && rows && columns) {
      const theaterData = {
        name,
        area,
        city,
        rows: parseInt(rows, 10),
        columns: parseInt(columns, 10),
        nonSeatingSpaces: nonSeatingSpaces.split(",").map((space) => space.trim()),
      };

      setTheater(theaterData);
      setSeatData({ rows: parseInt(rows, 10), columns: parseInt(columns, 10) });
      setData({ name, area, city });
      setNonData({
        rowNumber: rows,
        nonSeatingSpaces: nonSeatingSpaces.split(",").map((space) => space.trim()),
      });

      setShowSeatLayout(true);
    }
  };

  const clearFields = () => {
    setName("");
    setArea("");
    setCity("");
    setRows("");
    setColumns("");
    setNonSeatingSpaces("");
    setTheater(null);
    setShowSeatLayout(false);
  };

  return (
    <div className="container">
      <div className="form-section">
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Theater Name" required>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, areaRef)}
                  placeholder="Enter theater name"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Area" required>
                <Input
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, cityRef)}
                  ref={areaRef}
                  placeholder="Enter area"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="City" required>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, rowsRef)}
                  ref={cityRef}
                  placeholder="Enter city"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Rows" required>
                <Input
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, columnsRef)}
                  ref={rowsRef}
                  placeholder="Enter number of rows"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Columns" required>
                <Input
                  type="number"
                  value={columns}
                  onChange={(e) => setColumns(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, nonSeatingSpacesRef)}
                  ref={columnsRef}
                  placeholder="Enter number of columns"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Non-Seating Spaces (comma separated)">
                <Input
                  value={nonSeatingSpaces}
                  onChange={(e) => setNonSeatingSpaces(e.target.value)}
                  ref={nonSeatingSpacesRef}
                  placeholder="e.g., B7, B8, C7"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[0, 16]}>
            <Col span={10}>
              <Button type="primary" onClick={handleView} block>
                View
              </Button>
            </Col>
            <Col span={10}>
              <Button onClick={clearFields} block>
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      {/* Uncomment this section if you want to display the seat layout */}
      {/* <div className="layout-section">
        {showSeatLayout && (
          <SeatLayout
            theater={{
              name,
              area,
              city,
              rows: parseInt(rows, 10),
              columns: parseInt(columns, 10),
              nonSeatingSpaces: nonSeatingSpaces.split(',').map(space => space.trim()),
            }}
          />
        )}
      </div> */}
    </div>
  );
};

export default AddTheater;
