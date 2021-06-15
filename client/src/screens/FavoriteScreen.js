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
  Icon,
  Text
} from '@ui-kitten/components'
import { useQuery } from '@apollo/client'
import { GET_FAVORITES } from '../../graphql/queries'
import BottomNav from '../components/BottomNavigation'
import MovieCard from '../components/MovieCard'

function FavoriteScreen({ navigation }) {
  const [page, setPage] = useState('Favorite')
  const { loading, error, data } = useQuery(GET_FAVORITES) 
  
  if(!data.favorites.length) {
    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }}/>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#ececec' }}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text
                category='h4'
              >
                No Favorite here :(
              </Text>
            </View>
          </SafeAreaView>
        <BottomNav navigation={navigation} page={page} setPage={setPage}/>
      </>
    )
  }

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }}/>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ececec' }}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text category="h4"
              style={{ marginVertical: 20 }}
            >
              My Favourite Movie
            </Text>
              {
                data.favorites.map(favorite => {
                  return (
                    <MovieCard 
                      key={favorite._id} 
                      movie={favorite} 
                      navigation={navigation}
                      setPage={setPage}
                      page={page}
                    />
                  )
                })
              }
          </ScrollView>
        </SafeAreaView>
      <BottomNav navigation={navigation} page={page} setPage={setPage}/>
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
    justifyContent: 'center',
    alignItems: 'center'
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

export default FavoriteScreen