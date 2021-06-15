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


function TvSeriesCard({ tvSerie, navigation, setPage }) {
  return (
    <>
      <Card style={styles.card}
        onPress={() => {
          setPage('Detail')
          navigation.navigate('DetailTvSerie', {
            tvSerieId: tvSerie._id
          })
        }}
      >
      <Image
          style={styles.imgCard}
          source={{
            uri: tvSerie.poster_path,
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
              {tvSerie.title}
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
              <Text>{tvSerie.popularity}</Text>
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
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  cardContainer: {
    alignSelf: 'flex-start',
    margin: 25
  },
  imgCard: {
    width: '100%',
    height: 275
  }
})

export default TvSeriesCard