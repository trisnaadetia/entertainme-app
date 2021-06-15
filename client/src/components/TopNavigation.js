import React, { useState } from 'react'
import { 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { 
  Avatar, 
  Icon, 
  MenuItem, 
  OverflowMenu, 
  Text, 
  TopNavigation, 
  TopNavigationAction,
  Input
} from '@ui-kitten/components'
const fox = require('../../assets/fox.png')

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
)

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
)

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
)

function TopNav({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false)

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      <Avatar
        style={styles.logo}
        source={fox}
      />
      <Text category="h6">entertainMe</Text>
    </View>
  )

  return (
    <>
      <View style={styles.inner}>
        <TopNavigation
          title={renderTitle}
          style={styles.topNavigation}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 16
  },
  bottomNavigation: {
    marginVertical: 8,
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center'
  },
  card: {
    margin: 10,
    maxWidth: 225,
    maxHeight: 300
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  cardContainer: {
    alignSelf: 'flex-start',
    marginHorizontal: 25,
    marginVertical: 10
  },
  title: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 35,
    marginTop: 5
  }
})

export default TopNav