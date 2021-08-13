import Tab from '@material-ui/core/Tab'

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

interface CustomTabProps {
  index: string
  label: string
}

const CustomTab = (props: any) => {
  const { label, index, ...otherProps } = props
  return <Tab label={label} {...a11yProps(index)} {...otherProps} />
}

export default CustomTab
