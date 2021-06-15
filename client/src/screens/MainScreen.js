import React, { useState, useEffect } from 'react'
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
import MovieCard from '../components/MovieCard'
import TvSeriesCard from '../components/TvSeriesCard'
import { GET_ALL_DATA } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import BottomNav from '../components/BottomNavigation'
import TopNav from '../components/TopNavigation'
import Spinner from '../components/Spinner'

function MainScreen({ navigation }) {
  const [page, setPage] = useState('Main')
  const {loading, error, data} = useQuery(GET_ALL_DATA)

  if(loading) {
    return (
      <Spinner/>
    )
  }

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }}/>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ececec' }}>
        <TopNav navigation={navigation}/>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text category="h4"
            style={{ marginVertical: 40 }}
          >
            Find Movies, TV series and more ...
          </Text>
          <View style={styles.title}>
            <Text category="h5">
              Movies
            </Text>
            <Icon
              style={{ 
                width: 28, 
                height: 28
              }}
              fill='#8F9BB3'
              name='plus-outline'
              onPress={() => {
                setPage('Add')
                navigation.navigate('Add')
              }}
            />
          </View>
          <ScrollView horizontal={true} style={styles.cardContainer}>
            {
              data.movies.map(movie => {
                return (
                  <MovieCard 
                    key={movie._id} 
                    movie={movie} 
                    navigation={navigation}
                    setPage={setPage}
                  />
                )
              })
            }
          </ScrollView>
          <View style={styles.title}>
            <Text category="h5">
              Tv Series
            </Text>
          </View>
          <ScrollView horizontal={true} style={styles.cardContainer}>
            {
              data.tvSeries.map(tvSerie => {
                return (
                  <TvSeriesCard 
                    key={tvSerie._id} 
                    tvSerie={tvSerie}
                    navigation={navigation}
                    setPage={setPage}
                  />
                )
              })
            }
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
      </KeyboardAvoidingView>
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

export default MainScreen