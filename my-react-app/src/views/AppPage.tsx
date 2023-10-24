import React from "react";
import Button from "@mui/material/Button";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  Toolbar,
} from "@mui/material";
import IcecreamOutlinedIcon from "@mui/icons-material/IcecreamOutlined";
import "../index.css";
import "../fonts/AerologicaRegular-K7day.ttf";
import { ProductType, UserType } from "../types";
import { useStore } from "../store";

const optionButtonStyle = {
  backgroundColor: "rgb(178,87,253)",
  fontFamily: "pixelfont",
  textShadow: "0 0 10px rgba(0, 153, 255, 0.7)",
  fontSize: "12px",
  color: "#ffff",
};

// Open to renaming this, this is the parent page for the rest of the app once the user has logged in.
export default function AppPage() {
  const user = useStore((state) => state.user);
  const mode = useStore((state) => state.userMode);
  const products = useStore((state) => state.products);
  const orders = useStore((state) => state.orders);
  const drones = useStore((state) => state.drones);
  const cart = useStore((state) => state.cart);
  const navigate = useNavigate();

  const { changeMode } = useStore();
  const { loadProducts } = useStore();
  const { loadDrones } = useStore();
  const { loadHistory } = useStore();
  const { addConesToCart } = useStore();
  const { logout } = useStore();

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <AppBar
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "rgb(153,46,255)",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <IcecreamOutlinedIcon sx={{ mr: 1 }} />

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

              {(user.userType === UserType.EMPLOYEE ||
                user.userType === UserType.MANAGER) &&
                mode !== UserType.CUSTOMER && (
                  <Button
                    variant="outlined"
                    style={{ color: "purple", fontFamily: "pixelfont" }}
                    onClick={() => {
                      changeMode(UserType.CUSTOMER);
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
                    style={{ color: "purple", fontFamily: "pixelfont" }}
                    onClick={() => {
                      changeMode(UserType.EMPLOYEE);
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
                    style={{ color: "purple", fontFamily: "pixelfont" }}
                    onClick={() => {
                      changeMode(UserType.MANAGER);
                      navigate("/app/manager-quickview");
                    }}
                  >
                    Manager Mode
                  </Button>
                )}

              <Button
                variant="outlined"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                style={{ color: "purple", fontFamily: "pixelfont" }}
              >
                Home/Logout
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer
          PaperProps={{
            sx: { backgroundColor: "purple", color: "pink", width: "100px" },
          }}
          sx={{
            display: "flex",
            overflow: "hidden",
          }}
          variant="permanent"
          anchor="left"
          className="sidebar"
        >
          <Toolbar />
          <br />
          {(user.userType === UserType.CUSTOMER ||
            user.userType === UserType.GUEST ||
            mode === UserType.CUSTOMER) && (
            <>
              <Button
                sx={optionButtonStyle}
                variant="text"
                component={Link}
                to="/app/menu"
              >
                Menu
              </Button>
              <br />
              <Button
                sx={optionButtonStyle}
                variant="text"
                component={Link}
                to="/app/cart"
              >
                Cart
              </Button>
              <br />
              <Button
                sx={optionButtonStyle}
                variant="text"
                component={Link}
                to="/app/customer-history"
              >
                History
              </Button>
            </>
          )}
          {(user.userType === UserType.EMPLOYEE ||
            user.userType === UserType.MANAGER) &&
            mode === UserType.EMPLOYEE && (
              <>
                <Button
                  sx={optionButtonStyle}
                  variant="contained"
                  component={Link}
                  to="/app/drone-quickview"
                >
                  Quick View
                </Button>
                <br />
                <Button
                  sx={optionButtonStyle}
                  variant="contained"
                  component={Link}
                  to="/app/manage-drones"
                >
                  Manage Drones
                </Button>
                <br />
                <Button
                  sx={optionButtonStyle}
                  variant="contained"
                  component={Link}
                  to="/app/drone-history"
                >
                  History
                </Button>
                <br />
              </>
            )}
          {user.userType === UserType.MANAGER && mode === UserType.MANAGER && (
            <>
              <Button
                sx={optionButtonStyle}
                variant="contained"
                component={Link}
                to="/app/manager-quickview"
              >
                Quick View
              </Button>
              <br />
              <Button
                sx={optionButtonStyle}
                variant="contained"
                component={Link}
                to="/app/manage-inventory"
              >
                Restock
              </Button>
              <br />
              <Button
                sx={optionButtonStyle}
                variant="contained"
                component={Link}
                to="/app/manage-users"
              >
                Users
              </Button>
              <br />
              <Button
                sx={optionButtonStyle}
                variant="contained"
                component={Link}
                to="/app/manager-history"
              >
                History
              </Button>
            </>
          )}
          <br />
          <br />
          <br />
          <Button
            sx={optionButtonStyle}
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
  { name: "Big Boss", isActive: true, size: 3, id: 1 },
  { name: "2-Cone Terry", isActive: false, size: 2, id: 2 },
  { name: "Lightweight", isActive: true, size: 1, id: 3 },
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
