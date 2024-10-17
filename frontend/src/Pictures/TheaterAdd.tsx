import React, { useState } from "react";
import { Layout, Row, Col, Button } from "antd";
import AddTheater from "../components/AddTheater";
import SeatLayout from "../components/SeatLayout";

import "antd/dist/reset.css";

const { Content, Footer: AntFooter } = Layout;

interface Theater {
  name: string;
  city: string;
  rows: number; 
  columns: number; 
}

interface SeatLayoutType {
  seats: any[]; 
  rows: number; 
  columns: number; 
}

const TheaterAdd: React.FC = () => {
  const [theater, setTheater] = useState<Theater | null>(null);
  const [data, setData] = useState<any[]>([]); 
  const [seatLayouts, setSeatLayouts] = useState<SeatLayoutType[]>([]);
  const [currentLayoutIndex, setCurrentLayoutIndex] = useState<number>(0);
  const [nonData, setNonData] = useState<{ nonSeatingSpaces?: string[] }>({}); 
  const [showAddTheater, setShowAddTheater] = useState<boolean>(false);

  const toggleAddTheaterVisibility = () => {
    setShowAddTheater((prev) => !prev);
    if (!showAddTheater) {
      setTheater(null);
    }
  };

  const addSeatLayout = (layout: SeatLayoutType) => {
    setSeatLayouts([...seatLayouts, layout]);
    if (seatLayouts.length === 0) {
      setCurrentLayoutIndex(0);
    }
  };

  const removeSeatLayout = (index: number) => {
    const newLayouts = seatLayouts.filter((_, i) => i !== index);
    setSeatLayouts(newLayouts);
    if (newLayouts.length === 0) {
      setCurrentLayoutIndex(0);
    } else if (currentLayoutIndex >= newLayouts.length) {
      setCurrentLayoutIndex(newLayouts.length - 1);
    }
  };

  const showNextLayout = () => {
    if (currentLayoutIndex < seatLayouts.length - 1) {
      setCurrentLayoutIndex(currentLayoutIndex + 1);
    }
  };

  const showPreviousLayout = () => {
    if (currentLayoutIndex > 0) {
      setCurrentLayoutIndex(currentLayoutIndex - 1);
    }
  };

  return (
    <Layout>
      <Content style={{ padding: "20px", minHeight: "calc(100vh - 64px - 70px)" }}>
        <Row gutter={16}>
          <Col span={8}>
            <Button
              type="primary"
              onClick={toggleAddTheaterVisibility}
              style={{ marginBottom: "20px" }}
            >
              {showAddTheater ? "Hide Theater" : "Create Theater"}
            </Button>
            {showAddTheater && (
              <AddTheater
                setTheater={setTheater}
                setData={setData}
                setSeatData={addSeatLayout}
                setNonData={setNonData}
              />
            )}
          </Col>

          <Col span={16}>
            {theater ? (
              <div>
                <h2>
                  {theater.name} - {theater.city}
                </h2>
                {seatLayouts.length > 0 && (
                  <div>
                    <SeatLayout
                      theater={theater} 
                      saveData={data} 
                      seatsData={{
                        seats: seatLayouts[currentLayoutIndex].seats,
                        rows: seatLayouts[currentLayoutIndex].rows,
                        columns: seatLayouts[currentLayoutIndex].columns
                      }} 
                      nonData={nonData} 
                      onEditTheater={toggleAddTheaterVisibility}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>Select a theater to view details</div>
            )}
          </Col>
        </Row>
      </Content>

      <AntFooter style={{ textAlign: "center", padding: "10px 0" }} />
    </Layout>
  );
};

export default TheaterAdd;
