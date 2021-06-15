import React, { useState } from 'react'
import { 
  StyleSheet,
  View
} from 'react-native'
import { 
  Icon,
  BottomNavigation, 
  BottomNavigationTab,
  Text
} from '@ui-kitten/components'


const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = useState(initialState)
  return { selectedIndex, onSelect: setSelectedIndex }
}

function BottomNav({ navigation, page, setPage }) {
  const topState = useBottomNavigationState()
  
  const FavoriteIcon = (props) => (
    <Icon {...props} name="heart" onPress={() => {
      setPage('Favorite')
      navigation.navigate('Favorite')
    }}/>
  )
  
  const HomeIcon1 = (props) => (
    <Icon {...props} name="home" onPress={() => {
      setPage('Main')
      page !== 'Main' &&  navigation.navigate('Main')
    }}/>
  )

  const HomeIcon2 = (props) => (
    <Icon {...props} name="home"/>
  )

  return (
    <>
      <View style={styles.navigation}>
        <BottomNavigationTab title='HOME' icon={ page !== 'Main' ? HomeIcon1 : HomeIcon2 }/>
        <BottomNavigationTab title='FAVORITE' icon={FavoriteIcon}/>
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
  navigation: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 16
  },
  bottomNavigation: {
    paddingVertical: 8
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
    marginTop: 25
  }
})

export default BottomNav