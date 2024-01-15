import React, { useState } from 'react'
import CIcon from '@coreui/icons-react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CRow,
} from '@coreui/react'

import {
  cilCheckCircle, cilXCircle
} from '@coreui/icons'

const ShipmentList = () => {

  const shipmentsData = [
    {
      "shipmentNo": 1,
      "orderNo": 1,
      "pickupFromStore": false,
      "trackingNumber": "123456",
      "totalWeight": "2.00",
      "dateShipped": new Date(),
      "dateReadyForPickup": true,
      "dateDelivered": new Date()
    },
    {
      "shipmentNo": 2,
      "orderNo": 2,
      "pickupFromStore": true,
      "trackingNumber": "123456",
      "totalWeight": "2.00",
      "dateShipped": new Date().setDate(new Date().getDate() + 2),
      "dateReadyForPickup": true,
      "dateDelivered": new Date().setDate(new Date().getDate() + 4),
    },
    {
      "shipmentNo": 3,
      "orderNo": 3,
      "pickupFromStore": false,
      "trackingNumber": "123456",
      "totalWeight": "2.00",
      "dateShipped": new Date().setDate(new Date().getDate() + 3),
      "dateReadyForPickup": false,
      "dateDelivered": new Date().setDate(new Date().getDate() + 5),
    }
  ]

  const [shipments, setShipments] = useState(shipmentsData);

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CTable align="middle" className="mb-0 border mt-1" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>Shipment #</CTableHeaderCell>
                  <CTableHeaderCell>Order #</CTableHeaderCell>
                  <CTableHeaderCell>Pickup from store</CTableHeaderCell>
                  <CTableHeaderCell>Tracking number</CTableHeaderCell>
                  <CTableHeaderCell>Total weight</CTableHeaderCell>
                  <CTableHeaderCell>Date shipped</CTableHeaderCell>
                  <CTableHeaderCell>Date ready for pickup</CTableHeaderCell>
                  <CTableHeaderCell>Date delivered</CTableHeaderCell>
                  <CTableHeaderCell>View</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {shipments.map((item, index) => (
                  <CTableRow v-for="item in shipments" key={index}>
                    <CTableDataCell>
                      <div>{item.shipmentNo}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.orderNo}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.pickupFromStore ? <CIcon className="text-info" icon={cilCheckCircle} /> :
                        <CIcon className="text-info" icon={cilXCircle} />} </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.trackingNumber}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.totalWeight}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{new Date(item.dateShipped).toLocaleString()}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.dateReadyForPickup ? "-" : "Not Yet"}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{new Date(item.dateDelivered).toLocaleString()}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>View</div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ShipmentList
