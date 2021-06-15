import React, { useState } from 'react'
import { 
  StyleSheet, 
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native'
import { 
  Icon, 
  Text, 
  Input,
  Button
} from '@ui-kitten/components'
import Toast from 'react-native-toast-message'
import BottomNav from '../components/BottomNavigation'
import { useMutation } from '@apollo/client'
import { UPDATE_MOVIE, GET_ALL_DATA} from '../../graphql/queries'


function EditScreen({ navigation, route }) {
  const { movieData } = route.params
  const [updateMovie, { data, loading, error }] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{
      query: GET_ALL_DATA
    }],
    onCompleted: () => {
      navigation.replace('DetailMovie', {
        movieId: movieData._id
      })
    }
  })
  const [initialTag, setInitialTag] = useState('')
  const [page, setPage] = useState('Add')
  const [input, setInput] = useState({
    title: movieData.title,
    overview: movieData.overview,
    poster_path: movieData.poster_path,
    popularity: movieData.popularity.toString(),
    tag: movieData.tag
  })

  function handleTitle(text) {
    setInput({
      ...input, title: text
    })
  }

  function handleOverview(text) {
    setInput({
      ...input, overview: text
    })
  }

  function handlePoster_path(text) {
    setInput({
      ...input, poster_path: text
    })
  }

  function handlePopularity(text) {
    setInput({
      ...input, popularity: text
    })
  }

  function submitTag() {
    setInput({
      ...input, tag: [...input.tag, initialTag]
    })
    setInitialTag('')
  }

  function handleDelTag(payload) {
    let newTag = []
    input.tag.forEach(el => {
      if(el !== payload) {
        newTag.push(el)
      }
    })
    setInput({
      ...input, tag: newTag
    })
    setInitialTag('')
  }

  function toastError(msg) {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: msg,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 100,
    })
  }

  function submitForm() {
    let errorMsg = []
    for(let key in input) {
      if(!input[key].length) {
        errorMsg.push(key)
      }
    }
    
    if(errorMsg.length) {
      toastError('All input must be required')
    } else {
      updateMovie({ 
        variables: {
          id: movieData._id, 
          input: {
            title: input.title,
            overview: input.overview,
            poster_path: input.poster_path,
            popularity: +input.popularity,
            tag: input.tag
          } 
        } 
      })
      
    }
  }

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }}/>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ececec' }}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled
          >
            <View style={styles.inner}>
              <Text category="h3"
                style={{ marginVertical: 20 }}
              >
                Edit Movie
              </Text>
              <View>
                <Text style={{ 
                  marginBottom: 8 
                }}>
                  Title
                </Text>
                <Input
                  placeholder="title movie"
                  value={input.title}
                  onChangeText={(text) => handleTitle(text)}
                  style={{ marginBottom: 20 }}
                  size="medium"
                />
                <Text style={{ 
                  marginBottom: 8 
                }}>
                  Overview
                </Text>
                <Input
                  placeholder="overview movie"
                  value={input.overview}
                  onChangeText={(text) => handleOverview(text)}
                  style={{ marginBottom: 20 }}
                  size="medium"
                />
                <Text style={{ 
                  marginBottom: 8 
                }}>
                  Poster_path
                </Text>
                <Input
                  placeholder="poster_path movie"
                  value={input.poster_path}
                  onChangeText={(text) => handlePoster_path(text)}
                  style={{ marginBottom: 20 }}
                  size="medium"
                />
                <Text style={{ 
                  marginBottom: 8 
                }}>
                  Popularity
                </Text>
                <Input
                  placeholder="popularity movie"
                  value={input.popularity}
                  onChangeText={(text) => handlePopularity(text)}
                  style={{ marginBottom: 20 }}
                  size="medium"
                />
                <Text style={{ 
                  marginBottom: 8 
                }}>
                  Tag
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Input
                    name="tag"
                    placeholder="tag movie"
                    value={initialTag}
                    onChangeText={(text => setInitialTag(text))}
                    style={{ width: '85%', marginBottom: 20 }}
                    size="medium"
                  />
                  <Icon
                    style={{ 
                      width: 40, 
                      height: 40,
                      marginLeft: 10
                    }}
                    fill='#8F9BB3'
                    name='plus-outline'
                    onPress={() => {
                      submitTag()
                      Keyboard.dismiss()
                    }}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  {
                    input.tag && (
                      input.tag.map((el, idx) => {
                        return (
                          <View
                            key={idx}
                            style={{ 
                              backgroundColor: '#808080', 
                              marginHorizontal: 5 ,
                              padding: 5,
                              borderRadius: 5,
                              flexDirection: 'row'
                            }}
                          > 
                            <Icon 
                              name='close-outline'
                              fill='black'
                              style={{ width: 20, height: 20 }}
                              onPress={() => handleDelTag(el)}
                            />
                            <Text 
                              style={{ color: 'white' }}
                            >
                              {el}
                            </Text>
                          </View>
                        )
                      })
                    )
                  }
                </View>
                <Button 
                  style={{ marginVertical: 10 }}
                  onPress={submitForm}
                >
                  SUBMIT
                </Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      <BottomNav navigation={navigation} page={page} setPage={setPage}/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
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
    marginTop: 25
  }
})

export default EditScreen
