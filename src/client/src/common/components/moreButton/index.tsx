import React, { FC } from 'react'
import { IconButton, Menu } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setMoreButtonAnchorEl } from '../../../app/appSlice'

const MoreButton: FC = ({ children }) => {
  const anchorEl = useAppSelector((state) => state.app.moreButtonAnchorEl)
  const dispatch = useAppDispatch()

  return (
    <>
      <IconButton
        aria-label='settings'
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          dispatch(setMoreButtonAnchorEl(event.currentTarget))
        }
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => dispatch(setMoreButtonAnchorEl(null))}
      >
        {children}
      </Menu>
    </>
  )
}

export default MoreButton
