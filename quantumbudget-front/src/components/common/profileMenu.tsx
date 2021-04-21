import React, { useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MessageIcon from '@material-ui/icons/Message';
import { Route } from '../../redux/state';
import { useRouter } from 'next/router';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

interface OwnProps {
  avatarUrl?: string;
}

interface DispatchProps {
  logout: () => void;
}

type Props = OwnProps & DispatchProps;

export default function ProfileMenu(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const router = useRouter();
  const container = useRef(null);

  const closeDropdown = (event: MouseEvent) => {
    // event.preventDefault();
    console.log(container.current);
    console.log(event.target);
    if (
      container &&
      container?.current &&
      !container?.current?.contains(event.target)
    ) {
      setDropdownVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mouseup', closeDropdown);

    return function cleanup() {
      document.removeEventListener('mouseup', closeDropdown);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = (
    event: React.MouseEvent<HTMLLIElement | HTMLElement, MouseEvent>
  ): void => {
    event.preventDefault();
    setDropdownVisible(false);
    props.logout();
  };

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  const onFeedbackClick = (
    event: React.MouseEvent<HTMLLIElement | HTMLElement, MouseEvent>
  ): void => {
    event.preventDefault();
    setDropdownVisible(false);
    handleClose();
    openInNewTab(Route.MessangerBot);
  };

  const onBillingPortalClick = (
    event: React.MouseEvent<HTMLLIElement | HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    setDropdownVisible(false);
    handleClose();
    router.push(Route.RedirectToBillingPortal);
  };

  const toggledProfileDropdown = (
    event: React.MouseEvent<HTMLLIElement | HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div className="align-middle">
        <ul className="navbar-nav" ref={container}>
          <li className="nav-item dropdown">
            <button
              className="btn btn-link nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={toggledProfileDropdown}
            >
              Profile
            </button>
            <div
              className={
                dropdownVisible ? 'dropdown-menu show' : 'dropdown-menu'
              }
              aria-labelledby="navbarDropdownMenuLink"
            >
              <button className="dropdown-item" onClick={onLogoutClick}>
                Logout
              </button>
              <button className="dropdown-item" onClick={onBillingPortalClick}>
                Billing portal
              </button>
              <button className="dropdown-item" onClick={onFeedbackClick}>
                Leave feedback
              </button>
            </div>
          </li>
        </ul>
      </div>
      {/* <div className="align-middle" onBlur={closeDropdown}>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
          startIcon={<Avatar alt="Remy Sharp" src={props.avatarUrl} />}
        >
          Profile
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem onClick={onLogoutClick}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </StyledMenuItem>
          <StyledMenuItem onClick={onFeedbackClick}>
            <ListItemIcon>
              <MessageIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Leave feedback" />
          </StyledMenuItem>
          <StyledMenuItem onClick={onBillingPortalClick}>
            <ListItemIcon>
              <MessageIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Billing portal" />
          </StyledMenuItem>
        </StyledMenu>
      </div> */}
    </>
  );
}
