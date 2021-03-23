import React from 'react'

class useGeolocation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            userAddress: null
        };
        // Get Latitude and Longitude for Geolocation
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);

        // Get User Address as a Reverse Geocode Coordinates
        // this.getUserAddress = this.getUserAddress.bind(this);
    };

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    getCoordinates(position) {
        console.log(position.coords);
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        // this.getUserAddress();
    };

    // getUserAddress() {
    //     fetch("https://maps.googleapis.com/maps/api/staticmap?center=" + this.state.latitude + "," + this.state.longitude + "&zoom=14&size=400x300&sensor=false&markers=color=red%7C" + this.state.latitude + "," + this.state.longitude + "&key=")
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => alert(error))
        
    //     // Code not complete
    // }

    handleLocationError(error) {
        // eslint-disable-next-line default-case
        switch(error.code) {
            case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.")
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.")
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.")
              break;
            case error.UNKNOWN_ERROR:
              alert("An unknown error occurred.")
              break;
          }
    }

    render() {
        return (
            <div className="h-96 bg-gray-900 mx-2 p-8 rounded-md tracking-wide shadow-xl">
                <div className="flex items-center self-center">
                    <button className="rounded-md border border-gray-300 p-3 text-white font-medium hover:bg-gray-500" onClick={this.getLocation}>Get Coordinates</button>
                </div>
                <div>
                    <p className="text-yellow-300 text-xl pt-6">Latitude : <span className="text-white">{this.state.latitude}</span></p>
                    <p className="text-yellow-300 text-xl py-3">Longitude : <span className="text-white">{this.state.longitude}</span></p>
                    {
                        this.state.latitude && this.state.longitude ?
                        <>
                        <img className="my-4 text-white" src={"https://maps.googleapis.com/maps/api/staticmap?center=" + this.state.latitude + "," + this.state.longitude + "&zoom=14&size=400x300&sensor=false&markers=color=red%7C" + this.state.latitude + "," + this.state.longitude + "&key="} alt="display map location" />
                        <div className="flex flex-col items-center self-center justify-center">
                            <input id="myInput" className="w-full rounded-md border m-3 p-2" type="text" defaultValue={this.state.latitude + "," + this.state.longitude} />
                            <a className="rounded-md border bg-yellow-300 border-gray-300 mx-2 p-2 text-gray-900 font-medium hover:bg-yellow-600" href={"https://www.google.com/search?q=" + this.state.latitude + "," + this.state.longitude} target="_blank" rel="noreferrer">Search Map</a>
                        </div>
                        </>
                        :
                        null
                    }
                </div>
            </div>
        )      
    }
}

export default useGeolocation

