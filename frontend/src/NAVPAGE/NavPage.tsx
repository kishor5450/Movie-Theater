import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';



interface MenuItem {
    key: string;
    label: React.ReactNode;
  }


const NavPage = () => {


   


      const menuItems: MenuItem[] = [
        { key: "1", label: <Link to="/movies">Movies</Link> },
        { key: "2", label: <Link to="/add-movie">Add Movie</Link> },
        { key: "3", label: <Link to="/theaters">Theaters</Link> },
        { key: "4", label: <Link to="/add-theater">Add Theater</Link> },
      
        
      ];
    
  return (
    <div>
      <Menu
        theme="dark"
        mode="horizontal"
        items={menuItems}
        style={{ marginTop: "0px" }}
      />
    </div>
  )
}

export default NavPage;
