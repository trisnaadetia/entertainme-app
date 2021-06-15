import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image
} from 'react-native'
import {
  Text,
  Icon,
  Button
} from '@ui-kitten/components'
import BottomNav from '../components/BottomNavigation'
import { GET_TVSERIE_BY_ID } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import { DELETE_MOVIE, GET_ALL_DATA } from '../../graphql/queries'
import Spinner from '../components/Spinner'
import { useMutation } from '@apollo/client'

const EditIcon = (props) => (
  <Icon {...props} name='edit-2'/>
)

const DeleteIcon = (props) => (
  <Icon {...props} name='trash'/>
)

const FavoriteIcon = (props) => (
  <Icon {...props} name='star'/>
)

function Detail({ navigation, route }) {
  const { tvSerieId } = route.params
  const [page, setPage] = useState('Detail')
  const {loading, error, data} = useQuery(GET_TVSERIE_BY_ID, {
    variables: { id: tvSerieId }
  })
  // const [deleteMovie] = useMutation(DELETE_MOVIE, {
  //   refetchQueries: [{
  //     query: GET_ALL_DATA
  //   }],
  //   onCompleted: () => {
  //     navigation.replace('Main')
  //   }
  // })

  if(loading) {
    return (
      <Spinner/>
    )
  }

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }}/>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ececec' }}>
          <View style={styles.inner}>
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: data.tvSerie.poster_path,
                }}
              />
              <Text
                category='h4'
                style={{ marginBottom: 5 }}
              >
                {data.tvSerie.title}
              </Text>
              <Text 
                style={{ marginBottom: 5 }}
              >
                {data.tvSerie.tag.toString()}
              </Text>
              <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                <Icon
                  style={{ 
                    width: 15, 
                    height: 15,
                    marginBottom: 5,
                    marginRight: 5
                  }}
                  name="star" 
                  fill="gray"
                />
                <Text style={{ fontSize: 15 }}>
                  {data.tvSerie.popularity}
                </Text>
              </View>
              <Text style={{ fontSize: 20 }}>
                {data.tvSerie.overview}
              </Text>
            </View>
          </View>
        </SafeAreaView>
        {/* <View style={styles.control}>
          <Button style={styles.button} size='small' status='info' accessoryLeft={EditIcon}
            onPress={() => {
              navigation.navigate('Edit', {
                movieData: data.movie
              })
            }}
          >
            Edit
          </Button>
          <Button style={styles.button} size='small' status='danger' accessoryLeft={DeleteIcon}
            onPress={() => {
              deleteMovie({
                variables: { id: movieId }
              })
            }}
          >
            Delete
          </Button>
          <Button style={styles.button} size='small' status='success' accessoryLeft={FavoriteIcon}>
            Favorite
          </Button>
        </View> */}
      <BottomNav navigation={navigation} page={page} setPage={setPage}/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    margin: 10
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  image: {
    width: 350,
    height: 500,
    marginBottom: 10
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

export default Detail