import React from 'react'
import _ from 'lodash'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface IProps { onPress : (data : any, details : any ) => void;}

const AddressInput = (props : IProps) => {
    const {onPress} = props
    return (
        <GooglePlacesAutocomplete
            placeholder="Search"
            onFail={(error)=>{}}
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed={false} // true/false/undefined
            fetchDetails={true}
            // renderDescription={row => row.description} // custom description render
            onPress={()=> onPress && onPress()}
            query={{
            key: 'AIzaSyDQBBCtTFs_pu7bJamKGWgEVaCf5KC_7LA',
            language: 'en', // language of the results
            }}
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{}}
            GooglePlacesSearchQuery={{rankby: 'distance'}}
            filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
            ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            debounce={200}
        />
      )
}

export default AddressInput