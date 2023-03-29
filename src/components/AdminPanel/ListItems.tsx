import * as React from 'react'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material/'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import AlertDialogSlide from './SlideInForm'
function onClickHandler() {
  return (
    <>
      <AlertDialogSlide />
    </>
  )
}
export const MainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Borrowed books" onClick={onClickHandler} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
  </React.Fragment>
)
