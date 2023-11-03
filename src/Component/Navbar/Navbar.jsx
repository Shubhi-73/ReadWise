/* Style for the main navigation container */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #A6B1E1;
  padding: 10px 20px;
}

/* Style for the logo on the left */
.nav-logo p {
  font-size: 36px;
  font-weight: bold;
  color: #424874;
  margin: 0;
  background-color: #F4EEFF;
  padding: 10px 20px;
  border-radius: 4px;
}

/* Style for the navigation menu on the right */
.nav-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: flex-end; /* Align to the right */
}

/* Style for each menu item */
.nav-menu li {
  margin-right: 20px;
  position: relative;
}

/* Style for menu item links */
.nav-menu a {
  text-decoration: none;
  font-size: 18px;
  color: #424874;
}

/* Style for the horizontal line under the active menu item */
.nav-menu li hr {
  border: none;
  border-top: 2px solid #ACD8AA;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
}
