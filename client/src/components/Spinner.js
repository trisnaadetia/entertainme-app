import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Spinner } from '@ui-kitten/components'

function SpinnerSizesShowcase() {
  return (
    <Layout style={styles.container} level='1'>
      <Spinner size='large'/>
    </Layout>
  )
}

export default SpinnerSizesShowcase

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});
