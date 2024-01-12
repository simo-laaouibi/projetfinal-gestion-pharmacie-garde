import L from "leaflet"
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SideBar from "../pages/SideBar";

function GetIcon(_iconSize) {
    return L.icon({
        iconUrl: require("../static/Icons/marker1.png"),
        iconSize: [_iconSize]
    })
}

function MyMap() {

    const [pharmacie, setPharmacie] = useState({
        nom: "",
        lat: 0,
        log: 0
    })


    const { id } = useParams();

    useEffect(() => {
        loadPharmacie()
    }, []);


    const loadPharmacie = async () => {
        const result = await axios.get(process.env.React_App_URLf + `pharmacies/pharmacie/id=${id}`)
        setPharmacie(result.data)
    }
    const position = [pharmacie.lat, pharmacie.log]

    return (
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <SideBar />
                <div class="layout-page">
                    <div class="content-wrapper">
                        <LeafletMap className="map"
                            center={position}
                            zoom={3}
                            style={{ height: 750, with: 100 }}>

                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position} icon={GetIcon(40)}>
                                <Popup>
                                    Location of marker
                                </Popup>
                            </Marker>
                        </LeafletMap>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyMap;