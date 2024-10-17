import React, { useState } from "react";
import { Button } from "antd";
import MovieScheduleDialog from "../Merge/MovieSchedule"; 

const AdminPage: React.FC = () => {
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false); 

  const showDialog = (): void => {
    setIsDialogVisible(true);
  };

  const closeDialog = (): void => {
    setIsDialogVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showDialog}>
        Schedule a Movie
      </Button>
      <MovieScheduleDialog 
        visible={isDialogVisible} 
        onClose={closeDialog} 
        onMovieScheduled={(movie) => console.log(movie)} 
        theaterId={null} 
      />
    </div>
  );
};

export default AdminPage;
