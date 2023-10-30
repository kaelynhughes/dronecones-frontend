import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  useTheme,
} from "@mui/material";
import IcecreamOutlinedIcon from "@mui/icons-material/IcecreamOutlined";
import "../index.css";
import "../fonts/AerologicaRegular-K7day.ttf";
import { ProductType, UserType } from "../types";
import { useStore } from "../store";

// Open to renaming this, this is the parent page for the rest of the app once the user has logged in.
export default function AppPage() {
  const user = useStore((state) => state.user);
  const mode = useStore((state) => state.userMode);
  const products = useStore((state) => state.products);
  const orders = useStore((state) => state.orders);
  const drones = useStore((state) => state.drones);
  const cart = useStore((state) => state.cart);
  const appPath = useStore((state) => state.appPath);
  const navigate = useNavigate();
  const theme = useTheme();

  const { changeMode } = useStore();
  const { changePath } = useStore();
  const { loadProducts } = useStore();
  const { loadDrones } = useStore();
  const { loadHistory } = useStore();
  const { addConesToCart } = useStore();
  const { clearState } = useStore();

  const optionButtonStyle = {
    backgroundColor: `${theme.palette.primary.main}`,
    fontFamily: "pixelfont",
    textShadow: "0 0 10px rgba(0, 153, 255, 0.7)",
    fontSize: "12px",
    color: "#ffff",
    width: "100%",
  };

  const handleNavBar = (event: any, newPath: string) => {
    if (newPath !== null) {
      changePath(newPath);
      navigate(`/${newPath}`);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <AppBar
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: `${theme.palette.background.default}`,
            height: "65px",
          }}
        >
          <Container maxWidth={false}>
            <Toolbar sx={{ width: "100%" }} disableGutters>
              <IcecreamOutlinedIcon sx={{ mr: 1, align: "left" }} />

              <div>
                <span
                  className="logo-fontFirst"
                  style={{
                    fontSize: "25px",
                  }}
                >
                  DRONE
                </span>
                <span
                  className="logo-fontSecond"
                  style={{
                    fontSize: "25px",
                  }}
                >
                  CONES
                </span>
              </div>
              <Toolbar sx={{ width: "10%" }} />
              <Box
                sx={{
                  width: "100%",
                  justifyContent: "end",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {(user.userType === UserType.EMPLOYEE ||
                  user.userType === UserType.MANAGER) &&
                  mode !== UserType.CUSTOMER && (
                    <Button
                      variant="outlined"
                      style={{
                        color: `${theme.palette.primary.main}`,
                        fontFamily: "pixelfont",
                        fontSize: "13px",
                        width: "120px",
                      }}
                      size="medium"
                      onClick={() => {
                        changeMode(UserType.CUSTOMER);
                        changePath("app/menu");
                        navigate("/app/menu");
                      }}
                    >
                      Want Cones?
                    </Button>
                  )}

                {(user.userType === UserType.EMPLOYEE ||
                  user.userType === UserType.MANAGER) &&
                  mode !== UserType.EMPLOYEE && (
                    <Button
                      variant="outlined"
                      style={{
                        color: `${theme.palette.primary.main}`,
                        fontFamily: "pixelfont",
                        fontSize: "13px",
                        width: "120px",
                      }}
                      size="medium"
                      onClick={() => {
                        changeMode(UserType.EMPLOYEE);
                        changePath("app/drone-quickview");
                        navigate("/app/drone-quickview");
                      }}
                    >
                      Your Drones
                    </Button>
                  )}

                {user.userType === UserType.MANAGER &&
                  mode !== UserType.MANAGER && (
                    <Button
                      variant="outlined"
                      style={{
                        color: `${theme.palette.secondary.main}`,
                        fontFamily: "pixelfont",
                        fontSize: "13px",
                        width: "120px",
                      }}
                      size="medium"
                      onClick={() => {
                        changeMode(UserType.MANAGER);
                        changePath("app/manager-quickview");
                        navigate("/app/manager-quickview");
                      }}
                    >
                      Manager Mode
                    </Button>
                  )}

                <div
                  style={{
                    height: "30px",
                    marginLeft: "16px",
                    marginRight: "16px",
                  }}
                >
                  <span style={{ fontFamily: "pixelfont", fontSize: "8px" }}>
                    Welcome,
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "pixelfont",
                      fontSize: "11px",
                    }}
                  >
                    {user.username}
                  </p>
                </div>
                <Button
                  variant="outlined"
                  onClick={() => {
                    clearState();
                    navigate("/");
                  }}
                  size="small"
                  style={{
                    color: `${theme.palette.primary.main}`,
                    fontFamily: "pixelfont",
                    fontSize: "11px",
                    height: "30px",
                    marginTop: "15px",
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: `${theme.palette.primary.dark}`,
              color: `${theme.palette.divider}`,
              width: "100px",
            },
          }}
          sx={{
            display: "flex",
            overflow: "hidden",
          }}
          variant="permanent"
          anchor="left"
          className="sidebar"
        >
          {(user.userType === UserType.CUSTOMER ||
            user.userType === UserType.GUEST ||
            mode === UserType.CUSTOMER) && (
            <Box sx={{ width: "100%", padding: 0 }}>
              <Divider sx={{ height: "65px" }} />
              {/* Here we use a vertical ToggleButtonGroup */}
              <ToggleButtonGroup
                orientation="vertical"
                value={appPath}
                exclusive
                onChange={handleNavBar}
                fullWidth // The buttons take the full width of the container
                sx={{ width: "100%", height: "100%" }} // Style to expand to container
              >
                <ToggleButton value="app/menu" sx={optionButtonStyle}>
                  Menu
                </ToggleButton>
                <Divider sx={{ height: "1px" }} />
                <ToggleButton value="app/cart" sx={optionButtonStyle}>
                  Cart
                </ToggleButton>
                <Divider sx={{ height: "1px" }} />
                <ToggleButton
                  value="app/customer-history"
                  sx={optionButtonStyle}
                >
                  History
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          )}
          {(user.userType === UserType.EMPLOYEE ||
            user.userType === UserType.MANAGER) &&
            mode === UserType.EMPLOYEE && (
              <Box sx={{ width: "100%", padding: 0 }}>
                <Divider sx={{ height: "65px" }} />
                {/* Here we use a vertical ToggleButtonGroup */}
                <ToggleButtonGroup
                  orientation="vertical"
                  value={appPath}
                  exclusive
                  onChange={handleNavBar}
                  fullWidth // The buttons take the full width of the container
                  sx={{ width: "100%", height: "100%", optionButtonStyle }} // Style to expand to container
                >
                  <ToggleButton
                    value="app/drone-quickview"
                    sx={optionButtonStyle}
                  >
                    Quick View
                  </ToggleButton>
                  <Divider sx={{ height: "1px" }} />
                  <ToggleButton
                    value="app/manage-drones"
                    sx={optionButtonStyle}
                  >
                    Manage Drones
                  </ToggleButton>
                  <Divider sx={{ height: "1px" }} />
                  <ToggleButton
                    value="app/drone-history"
                    sx={optionButtonStyle}
                  >
                    History
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            )}
          {user.userType === UserType.MANAGER && mode === UserType.MANAGER && (
            <Box sx={{ width: "100%", padding: 0 }}>
              <Divider sx={{ height: "65px" }} />
              {/* Here we use a vertical ToggleButtonGroup */}
              <ToggleButtonGroup
                orientation="vertical"
                value={appPath}
                exclusive
                onChange={handleNavBar}
                fullWidth // The buttons take the full width of the container
                sx={{ width: "100%", height: "100%", optionButtonStyle }} // Style to expand to container
              >
                <ToggleButton
                  value="app/manager-quickview"
                  sx={optionButtonStyle}
                >
                  Quick View
                </ToggleButton>
                <Divider sx={{ height: "1px" }} />
                <ToggleButton
                  value="app/manage-inventory"
                  sx={optionButtonStyle}
                >
                  Restock
                </ToggleButton>
                <Divider sx={{ height: "1px" }} />
                <ToggleButton value="app/manage-users" sx={optionButtonStyle}>
                  Users
                </ToggleButton>
                <Divider sx={{ height: "1px" }} />
                <ToggleButton
                  value="app/manager-history"
                  sx={optionButtonStyle}
                >
                  History
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          )}
          <Divider sx={{ height: "75%" }} />
          <Button
            sx={optionButtonStyle}
            style={{ justifySelf: "end" }}
            variant="outlined"
            onClick={() => {
              if (products.length === 0) {
                loadProducts(mockProducts);
              }
              if (cart.length === 0) {
                addConesToCart(mockCones);
              }
              if (drones.length === 0) {
                loadDrones(mockDrones);
              }
              if (orders.length === 0) {
                loadHistory(mockOrders);
              }
            }}
          >
            Populate State
          </Button>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, marginLeft: "100px", marginTop: "50px" }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

const mockProducts = [
  {
    name: "Sugar Cone",
    stock: 20,
    ppu: 50,
    cpu: 10,
    type: ProductType.CONE,
    id: 1,
  },
  {
    name: "Waffle Cone",
    stock: 11,
    ppu: 100,
    cpu: 25,
    type: ProductType.CONE,
    id: 2,
  },
  {
    name: "Sprinkles",
    stock: 56,
    ppu: 50,
    cpu: 1,
    type: ProductType.TOPPING,
    id: 3,
  },
  {
    name: "Oreos",
    stock: 35,
    ppu: 50,
    cpu: 10,
    type: ProductType.TOPPING,
    id: 4,
  },
  {
    name: "Chocolate Syrup",
    stock: 27,
    ppu: 50,
    cpu: 5,
    type: ProductType.TOPPING,
    id: 5,
  },
  {
    name: "Chocolate",
    stock: 76,
    ppu: 250,
    cpu: 60,
    type: ProductType.ICECREAM,
    id: 6,
  },
  {
    name: "Vanilla",
    stock: 45,
    ppu: 250,
    cpu: 30,
    type: ProductType.ICECREAM,
    id: 7,
  },
  {
    name: "Mint Chocolate Chip",
    stock: 63,
    ppu: 250,
    cpu: 75,
    type: ProductType.ICECREAM,
    id: 8,
  },
];

const mockCones = [
  {
    components: [
      {
        name: "Sugar Cone",
        stock: 20,
        ppu: 50,
        cpu: 10,
        type: ProductType.CONE,
        id: 1,
      },
      {
        name: "Oreos",
        stock: 35,
        ppu: 50,
        cpu: 10,
        type: ProductType.TOPPING,
        id: 4,
      },
      {
        name: "Chocolate Syrup",
        stock: 27,
        ppu: 50,
        cpu: 5,
        type: ProductType.TOPPING,
        id: 5,
      },
      {
        name: "Chocolate",
        stock: 76,
        ppu: 250,
        cpu: 60,
        type: ProductType.ICECREAM,
        id: 6,
      },
      {
        name: "Vanilla",
        stock: 45,
        ppu: 250,
        cpu: 30,
        type: ProductType.ICECREAM,
        id: 7,
      },
      {
        name: "Vanilla",
        stock: 45,
        ppu: 250,
        cpu: 30,
        type: ProductType.ICECREAM,
        id: 7,
      },
    ],
  },
  {
    components: [
      {
        name: "Waffle Cone",
        stock: 11,
        ppu: 100,
        cpu: 25,
        type: ProductType.CONE,
        id: 2,
      },
      {
        name: "Sprinkles",
        stock: 56,
        ppu: 50,
        cpu: 1,
        type: ProductType.TOPPING,
        id: 3,
      },
      {
        name: "Vanilla",
        stock: 45,
        ppu: 250,
        cpu: 30,
        type: ProductType.ICECREAM,
        id: 7,
      },
    ],
  },
  {
    components: [
      {
        name: "Waffle Cone",
        stock: 11,
        ppu: 100,
        cpu: 25,
        type: ProductType.CONE,
        id: 2,
      },
      {
        name: "Mint Chocolate Chip",
        stock: 63,
        ppu: 250,
        cpu: 75,
        type: ProductType.ICECREAM,
        id: 8,
      },
      {
        name: "Mint Chocolate Chip",
        stock: 63,
        ppu: 250,
        cpu: 75,
        type: ProductType.ICECREAM,
        id: 8,
      },
    ],
  },
];

const mockDrones = [
  {
    name: "Big Boss",
    isActive: true,
    size: 3,
    orderCount: 11,
    earnings: 3420,
    id: 1,
  },
  {
    name: "2-Cone Terry",
    isActive: false,
    size: 2,
    orderCount: 5,
    earnings: 1853,
    id: 2,
  },
  {
    name: "Lightweight",
    isActive: true,
    size: 1,
    orderCount: 17,
    earnings: 2900,
    id: 3,
  },
  {
    name: "Quad-Copter",
    isActive: true,
    size: 3,
    orderCount: 4,
    earnings: 879,
    id: 4,
  },
  {
    name: "Mini",
    isActive: true,
    size: 1,
    orderCount: 8,
    earnings: 950,
    id: 5,
  },
  {
    name: "Jerry",
    isActive: false,
    size: 2,
    orderCount: 3,
    earnings: 324,
    id: 6,
  },
];

const mockOrders = [
  {
    cones: [
      {
        components: [
          {
            name: "Waffle Cone",
            stock: 11,
            ppu: 100,
            cpu: 25,
            type: ProductType.CONE,
            id: 2,
          },
          {
            name: "Mint Chocolate Chip",
            stock: 63,
            ppu: 250,
            cpu: 75,
            type: ProductType.ICECREAM,
            id: 8,
          },
          {
            name: "Mint Chocolate Chip",
            stock: 63,
            ppu: 250,
            cpu: 75,
            type: ProductType.ICECREAM,
            id: 8,
          },
        ],
      },
      {
        components: [
          {
            name: "Waffle Cone",
            stock: 11,
            ppu: 100,
            cpu: 25,
            type: ProductType.CONE,
            id: 2,
          },
          {
            name: "Mint Chocolate Chip",
            stock: 63,
            ppu: 250,
            cpu: 75,
            type: ProductType.ICECREAM,
            id: 8,
          },
          {
            name: "Mint Chocolate Chip",
            stock: 63,
            ppu: 250,
            cpu: 75,
            type: ProductType.ICECREAM,
            id: 8,
          },
        ],
      },
    ],
    totalPrice: 1200,
    employeeCut: 300,
    remainder: 900,
    timestamp: new Date(),
    id: 1,
  },
  {
    cones: [
      {
        components: [
          {
            name: "Waffle Cone",
            stock: 11,
            ppu: 100,
            cpu: 25,
            type: ProductType.CONE,
            id: 2,
          },
          {
            name: "Sprinkles",
            stock: 56,
            ppu: 50,
            cpu: 1,
            type: ProductType.TOPPING,
            id: 3,
          },
          {
            name: "Vanilla",
            stock: 45,
            ppu: 250,
            cpu: 30,
            type: ProductType.ICECREAM,
            id: 7,
          },
        ],
      },
    ],
    totalPrice: 400,
    employeeCut: 100,
    remainder: 300,
    timestamp: new Date(),
    id: 2,
  },
  {
    cones: [
      {
        components: [
          {
            name: "Sugar Cone",
            stock: 20,
            ppu: 50,
            cpu: 10,
            type: ProductType.CONE,
            id: 1,
          },
          {
            name: "Oreos",
            stock: 35,
            ppu: 50,
            cpu: 10,
            type: ProductType.TOPPING,
            id: 4,
          },
          {
            name: "Chocolate Syrup",
            stock: 27,
            ppu: 50,
            cpu: 5,
            type: ProductType.TOPPING,
            id: 5,
          },
          {
            name: "Chocolate",
            stock: 76,
            ppu: 250,
            cpu: 60,
            type: ProductType.ICECREAM,
            id: 6,
          },
          {
            name: "Vanilla",
            stock: 45,
            ppu: 250,
            cpu: 30,
            type: ProductType.ICECREAM,
            id: 7,
          },
          {
            name: "Vanilla",
            stock: 45,
            ppu: 250,
            cpu: 30,
            type: ProductType.ICECREAM,
            id: 7,
          },
        ],
      },
      {
        components: [
          {
            name: "Sugar Cone",
            stock: 20,
            ppu: 50,
            cpu: 10,
            type: ProductType.CONE,
            id: 1,
          },
          {
            name: "Oreos",
            stock: 35,
            ppu: 50,
            cpu: 10,
            type: ProductType.TOPPING,
            id: 4,
          },
          {
            name: "Chocolate Syrup",
            stock: 27,
            ppu: 50,
            cpu: 5,
            type: ProductType.TOPPING,
            id: 5,
          },
          {
            name: "Chocolate",
            stock: 76,
            ppu: 250,
            cpu: 60,
            type: ProductType.ICECREAM,
            id: 6,
          },
          {
            name: "Vanilla",
            stock: 45,
            ppu: 250,
            cpu: 30,
            type: ProductType.ICECREAM,
            id: 7,
          },
          {
            name: "Vanilla",
            stock: 45,
            ppu: 250,
            cpu: 30,
            type: ProductType.ICECREAM,
            id: 7,
          },
        ],
      },
    ],
    totalPrice: 800,
    employeeCut: 233,
    remainder: 467,
    timestamp: new Date(),
    id: 3,
  },
];
