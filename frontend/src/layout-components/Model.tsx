// import React from "react";
// import { Modal } from "antd";
// import FetchedSeatLayout from "../layout-components/FetchedSeatLayout";

// interface SeatLayoutModalProps {
//   visible: boolean;
//   onClose: () => void;
//   theaterId: number; 
//   movieId: number; 
//   theaterName: string; 
//   movieName: string; 
// }

// const SeatLayoutModal: React.FC<SeatLayoutModalProps> = ({
//   visible,
//   onClose,
//   theaterId,
//   movieId,
//   theaterName,
//   movieName,
// }) => {
//   return (
//     <Modal
//       title="Seating Layout"
//       visible={visible}
//       onCancel={onClose}
//       footer={null}
//       width={850} 
//     >
//       <FetchedSeatLayout 
//         theaterId={theaterId.toString()} 
//         movieId={movieId.toString()} 
//         theaterName={theaterName} 
//         movieName={movieName} 
//         onClose={onClose} 
//       />
//     </Modal>
//   );
// };

// export default SeatLayoutModal;
import React from "react";
import { Modal } from "antd";
import FetchedSeatLayout from "../layout-components/FetchedSeatLayout";

interface SeatLayoutModalProps {
  visible: boolean;
  onClose: () => void;
  theaterId: number; 
  movieId: number; 
  theaterName: string; 
  movieName: string; 
  showTime: string; 
}

const SeatLayoutModal: React.FC<SeatLayoutModalProps> = ({
  visible,
  onClose,
  theaterId,
  movieId,
  theaterName,
  movieName,
  showTime, 
}) => {
  return (
    <Modal
      title="Seating Layout"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={850} 
    >
      <FetchedSeatLayout 
        theaterId={theaterId.toString()} 
        movieId={movieId.toString()} 
        theaterName={theaterName} 
        movieName={movieName} 
        showTime={showTime}  
        onClose={onClose} 
      />
    </Modal>
  );
};

export default SeatLayoutModal;
