import { makeStyles } from '@material-ui/core'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '0.75em'
  }
}))

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  const classes = useStyles()
  return (
    <div
      role='tabpanel'
      className={classes.root}
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

export default TabPanel
