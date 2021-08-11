import { makeStyles } from '@material-ui/core'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '20px'
  }
}))

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  const classes = useStyles()
  return (
    <div
      role='tabpanel'
      className={classes.root}
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

export default TabPanel
