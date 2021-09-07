import Tab from '@material-ui/core/Tab'

function a11yProps(index: any) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`
  }
}

const CustomTab = (props: any) => {
  const { label, icon, index, ...otherProps } = props
  return <Tab label={label} icon={icon} {...a11yProps(index)} {...otherProps} />
}

export default CustomTab
