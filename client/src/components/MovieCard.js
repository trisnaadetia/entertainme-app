import React from 'react'
import { 
  StyleSheet,
  View,
  Image
} from 'react-native'
import { 
  Card,
  Text,
  Icon
} from '@ui-kitten/components'

function MovieCard({ movie, navigation, setPage, page }) {
  return (
    <>
      <Card style={page !== 'Favorite' ? styles.card : styles.card1}
        onPress={() => {
          setPage('Detail')
          navigation.navigate('DetailMovie', {
            movieId: movie._id
          })
        }}
      >
        <Image
          style={page !== 'Favorite' ? styles.imgCard : styles.imgCard1}
          source={{
            uri: movie.poster_path,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 55
          }}
        >
          <View>
            <Text 
              style={{ 
                textAlign: 'center'
              }}
            >
              {movie.title}
            </Text>
            <View 
              style={{ 
                flexDirection: 'row', 
                justifyContent: 'center', 
                alignItems: 'center'
              }}
            >
              <Icon
                style={{ 
                  width: 20, 
                  height: 20,
                  margin: 3
                }}
                name="star" 
                fill="gray"
              />
              <Text>{movie.popularity}</Text>
            </View>
          </View>
        </View>
      </Card>
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
    justifyContent: 'flex-end'
  },
  card: {
    margin: 10,
    width: 215,
    maxHeight: 355
  },
  card1: {
    margin: 10,
    width: 325,
    maxHeight: 450
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
    margin: 25,
  },
  imgCard: {
    width: '100%',
    height: 275
  },
  imgCard1: {
    width: '100%',
    height: 360,
    marginBottom: 10
  }
})

export default MovieCard