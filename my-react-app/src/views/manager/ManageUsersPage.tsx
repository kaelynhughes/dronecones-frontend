import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useStore } from "../../store";
import { UserType } from "../../types";

import { Box, Grid, Card, Switch, FormGroup,FormControlLabel } from "@mui/material";

const textStyle = {
  color: "white",
  fontFamily: "pixelfont",
};

export default function ManageUsersPage() {
  const user = useStore((state) => state.user);
  const allUsers = useStore((state) => state.users)
  const { loadUsers } = useStore();
  const { loadedUsers } = useStore();
  const { banUser } = useStore();
  const { activateUser } = useStore();
  
  if (allUsers.length === 0 && !loadedUsers) {
    loadUsers();
  }


  //sorts them into lists to be displayed
  let customerList = [];
  let employeeList = [];
  let managerList = [];
  for(let i = 0; i < allUsers.length; i++){
    if(allUsers[i].user_type === UserType.MANAGER){
      //prevents manager from entering list
      if(user.username != allUsers[i].username){
        managerList.push(allUsers[i]);
      }
    } else if(allUsers[i].user_type === UserType.EMPLOYEE){
      employeeList.push(allUsers[i]);

    } else {
      customerList.push(allUsers[i]);
    }
  }


  {
    /*Populate Customer Users*/
  }



  const renderedCustomers = customerList.map((item) => {
    let localQuantity = 0;
    return (
      <div key={item.id}>
        <div style={{ display: "flex" }}>
          <p className="pixel-font" style={{margin:"10px"}}>
            {item.username}
          </p>
          <FormGroup>
          {/* Handles whether or not to ban or activate user */}
          <FormControlLabel control={<Switch defaultChecked = {item.is_active}/>}  onChange={() => {      
            if(item.is_active){
              if(item.id){
                banUser(item.id);
              }
            } else {
              if(item.id){
                activateUser(item.id);
              }
            }
            item.is_active = !item.is_active;
            
          }} label="Banned" />
          </FormGroup>
        </div>
      </div>
    );
  });

  {
    /*Populate Manager Users - does not include current user*/
  }
  const renderedManagers = managerList.map((item) => {
    return (
      <div key={item.id}>
        <div style={{ display: "flex" }}>
          <p className="pixel-font" style={{margin:"10px"}}>
            {item.username}
          </p>
          <FormGroup>

          <FormControlLabel control={<Switch defaultChecked = {item.is_active}/>}  onChange={() => {
            console.log("BEFORE SWITCH...");
            console.log(item.is_active);
            
            if(item.is_active){
              if(item.id){
                banUser(item.id);
              }
            } else {
              if(item.id){
                activateUser(item.id);
                console.log("Should be active again");
              }
            }
            item.is_active = !item.is_active;
            //item.is_active = !item.is_active;
            console.log("AFTER SWITCH...");
            console.log(item.is_active);
            
          }} label="Banned" />
          </FormGroup>
        </div>
      </div>
    );
  });

  {
    /*Populate Employee Users*/
  }
  const renderedEmployees = employeeList.map((item) => {
    let localQuantity = 0;
    return (
      <div key={item.id}>
        <div style={{ display: "flex" }}>
          <p className="pixel-font" style={{margin:"10px"}}>
            {item.username}
          </p>
          <FormGroup>

          <FormControlLabel control={<Switch defaultChecked = {item.is_active}/>}  onChange={() => {
            
            if(item.is_active){
              if(item.id){
                banUser(item.id);
              }
            } else {
              if(item.id){
                activateUser(item.id);
                console.log("Should be active again");
              }
            }
            item.is_active = !item.is_active;
            
          }} label="Banned" />
          </FormGroup>
        </div>
      </div>
    );
  });

  let emptyCustomer= "";
  if(customerList.length==0){
    emptyCustomer= "No customer users";
  }
  let emtpyEmployee= "";
  if(employeeList.length==0){
    emtpyEmployee= "No Employee users";
  }
  
  return (
    <>
      {user.user_type === UserType.MANAGER && (
        <>


            {/*Manage Users Page, allows a manager to ban or unban users sorted by
            recent orders
            */}
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card sx={textStyle}>
                  <div className="centerFormat">
                  <h1 className="header-font" style={{margin:"5px", height:"100%"}}>Customers</h1>{emptyCustomer}{renderedCustomers}
                  </div>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={textStyle}>
                  <div className="centerFormat">
                  <h1 className="header-font" style={{margin:"5px"}}>Employees</h1>{emtpyEmployee}{renderedEmployees}
                  </div>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={textStyle}>
                  <div className="centerFormat">
                  <h1 className="header-font" style={{margin:"5px"}}>Managers</h1><p style={{color:"yellow"}}>{user.username}</p>{renderedManagers}
                  </div>
                </Card>
              </Grid>

            </Grid>
        </>
      )}
    </>
  );
}
