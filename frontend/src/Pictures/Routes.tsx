// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { Menu } from "antd";
// import AddMovie from "../Pictures/AddMovie";
// import MovieList from "../Pictures/MovieList";
// import UpdateMovie from "../Pictures/UpdateMovie";
// import DeleteMovie from "../Pictures/DeleteMovie";
// import TheaterAdd from "../Pictures/TheaterAdd";
// import Footer from "../layout-components/Footer";
// import Header from "./Header";
// import HomePage from "./HomePage";
// import Cards from "../cards/cards";
// import TicketPage from "../Dummy/TicketPage";
// // import ShowsForm from "../Shows/Shows";


// interface MenuItem {
//   key: string;
//   label: React.ReactNode;
// }

// const RoutesComponent: React.FC = () => {
//   const menuItems: MenuItem[] = [
//     { key: "1", label: <Link to="/movies">Movies</Link> },
//     { key: "2", label: <Link to="/add-movie">Add Movie</Link> },
//     { key: "3", label: <Link to="/theaters">Theaters</Link> },
//     { key: "4", label: <Link to="/add-theater">Add Theater</Link> },
//   ];

//   return (
//     <Router>
//       <Header />

//       <Menu
//         theme="dark"
//         mode="horizontal"
//         items={menuItems}
//         style={{ marginTop: "0px" }}
//       />
//       <Routes>
//         <Route path="/movies" element={<MovieList />} />
//         <Route path="/add-movie" element={<AddMovie />} />
//         <Route path="/theaters" element={<Footer />} />
//         <Route path="/add-theater" element={<TheaterAdd />} />
//         <Route path="/update-movie/:id" element={<UpdateMovie />} />
//         <Route path="/delete-movie/:id" element={<DeleteMovie />} />
//         <Route path="/tickets" element={<TicketPage />} />
//       </Routes>
//       <HomePage />
//       {/* <ShowsForm/> */}
//     </Router>
//   );
// };

// export default RoutesComponent;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu } from "antd";
import AddMovie from "../Pictures/AddMovie";
import MovieList from "../Pictures/MovieList";
import UpdateMovie from "../Pictures/UpdateMovie";
import DeleteMovie from "../Pictures/DeleteMovie";
import TheaterAdd from "../Pictures/TheaterAdd";
import Footer from "../layout-components/Footer";
import Header from "./Header";
import HomePage from "./HomePage";
import Cards from "../cards/cards";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// import TicketPage from "../Dummy/TicketPage"; // Adjusted the path for TicketPage

// import ShowsForm from "../Shows/Shows";
const stripePromise = loadStripe("pk_test_51QAVKjB3Epo01Whmai97g3ZiNXZl86lxBaM7OzACPyTHsxwLuBLYGmYCT6J4RWCeFMROnxwkYX828dS6TwhDdSgd00g7EOAEdH");

interface MenuItem {
  key: string;
  label: React.ReactNode;
}

const RoutesComponent: React.FC = () => {
  const menuItems: MenuItem[] = [
    { key: "1", label: <Link to="/movies">Movies</Link> },
    { key: "2", label: <Link to="/add-movie">Add Movie</Link> },
    { key: "3", label: <Link to="/theaters">Theaters</Link> },
    { key: "4", label: <Link to="/add-theater">Add Theater</Link> },
  
    
  ];

  return (
    <Router>
      <Header />

      <Menu
        theme="dark"
        mode="horizontal"
        items={menuItems}
        style={{ marginTop: "0px" }}
      />
      <Routes>
        <Route path="/movies" element={<MovieList />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/theaters" element={<Footer />} />
        <Route path="/add-theater" element={<TheaterAdd />} />
        <Route path="/update-movie/:id" element={<UpdateMovie />} />
        <Route path="/delete-movie/:id" element={<DeleteMovie />} />
        
        {/* <Route path="/tickets" element={<TicketPage />} /> */}
        
      </Routes>

      <Elements stripe={stripePromise}>
      <HomePage />
      </Elements>
      
      {/* <ShowsForm/> */}
    </Router>
  );
};

export default RoutesComponent;

