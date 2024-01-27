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
  CFormCheck,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CAccordion,
  CFormLabel,
  CFormInput,
  CCol,
  CFormSelect,
  CButton,
} from '@coreui/react'

import {
  cilCheckCircle, cilXCircle, cilSearch, cilCaretRight, cilCaretBottom
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
      "dateDelivered": new Date(),
      "showProduct": true,
      "productDetails": [{
        "name": "Levi's 511 Jeans",
        "warehouse": "test1",
        "qtyShipped": 1,
        "itemWeight": 5,
        "dimensions": "2.00 x 2.00 x 2.00"
      }]
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
      "showProduct": false,
      "productDetails": [{
        "name": "Pride and Prejudice",
        "warehouse": "test2",
        "qtyShipped": 1,
        "itemWeight": 5,
        "dimensions": "2.00 x 2.00 x 2.00"
      }]
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
      "showProduct": true,
      "productDetails": [{
        "name": "Fahrenheit 451 by Ray Bradbury",
        "warehouse": "test3",
        "qtyShipped": 1,
        "itemWeight": 5,
        "dimensions": "2.00 x 2.00 x 2.00"
      },
      {
        "name": "First Prize Pies",
        "warehouse": "test4",
        "qtyShipped": 1,
        "itemWeight": 5,
        "dimensions": "2.00 x 2.00 x 2.00"
      }
      ]
    }
  ]

  const [shipments, setShipments] = useState(shipmentsData);
  const [searchInfo, setSearchInfo] = useState({
    startDate: '', ddlCountry: '', endDate: '', ddlState: '', trackingNo: '', txtContryRegion: '',
    ddlWarehouse: '', txtCity: '', loadDelivered: false, loadShipped: true, loadNotReadyPickup: false
  });
  const expandCollapseProduct = (item) => {
    item.showProduct = !item.showProduct;
    const shipmentsData = shipments.map(sh => (sh.shipmentNo === item.shipmentNo ? { ...sh, item } : sh))
    setShipments(shipmentsData);
  }
  const handleSearchUpdate = (e, key) => {
    
    if (key === 'loadDelivered' || key === 'loadShipped' || key === 'loadNotReadyPickup' ) {
      searchInfo[key] = (e.target.value === 'true') ? false : true;
    } else {
      searchInfo[key] = e.target.value;
    }
   
    setSearchInfo({ ...searchInfo });
  }
  const serachHandled = () => {
    console.log(searchInfo)
  }

  return (
    <React.Fragment>
      <CCard className="mb-4">
        <CAccordion activeItemKey={2}>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader><CIcon className="text-info" icon={cilSearch} /> &nbsp; <strong>Search</strong>  </CAccordionHeader>
            <CAccordionBody>
              <CRow className="mb-1">
                <CFormLabel htmlFor="startDate" className="col-sm-2">Start date :</CFormLabel>
                <CCol sm={3}><CFormInput className="mb-3" type="date" id="startDate" value={searchInfo.startDate} onChange={(e) => { handleSearchUpdate(e, 'startDate'); }} /> </CCol>
                <CCol sm={2}> </CCol>
                <CFormLabel htmlFor="ddlCountry" className="col-sm-2">Country :</CFormLabel>
                <CCol sm={3}>
                  <CFormSelect size="sm" className="mb-3" id="ddlCountry" aria-label="select country"
                    value={searchInfo.ddlCountry} onChange={(e) => { handleSearchUpdate(e, 'ddlCountry'); }}>
                    <option>Select country</option>
                    <option value="1">India</option>
                    <option value="2"> USA</option>
                    <option value="3">Australia</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-1">
                <CFormLabel htmlFor="endDate" className="col-sm-2">End date :</CFormLabel>
                <CCol sm={3}><CFormInput className="mb-3" type="date" id="endDate" value={searchInfo.endDate} onChange={(e) => { handleSearchUpdate(e, 'endDate'); }} /> </CCol>
                <CCol sm={2}> </CCol>
                <CFormLabel htmlFor="ddlState" className="col-sm-2">State / province :</CFormLabel>
                <CCol sm={3}>
                  <CFormSelect size="sm" className="mb-3" id="ddlState" aria-label="select state"
                    value={searchInfo.ddlState} onChange={(e) => { handleSearchUpdate(e, 'ddlState'); }}>
                    <option>Other</option>
                    <option value="1">MH</option>
                    <option value="2"> MP</option>
                    <option value="3">UP</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-1">
                <CFormLabel htmlFor="trackingNo" className="col-sm-2">Tracking number :</CFormLabel>
                <CCol sm={3}><CFormInput className="mb-3" type="text" id="trackingNo"
                  value={searchInfo.trackingNo} onChange={(e) => { handleSearchUpdate(e, 'trackingNo'); }}/> </CCol>
                <CCol sm={2}> </CCol>
                <CFormLabel htmlFor="txtContryRegion" className="col-sm-2">County / region :</CFormLabel>
                <CCol sm={3}>
                  <CFormInput className="mb-3" type="text" id="txtContryRegion"
                    value={searchInfo.txtContryRegion} onChange={(e) => { handleSearchUpdate(e, 'txtContryRegion'); }}/>
                </CCol>
              </CRow>
              <CRow className="mb-1">
                <CFormLabel htmlFor="ddlWarehouse" className="col-sm-2">Warehouse :</CFormLabel>
                <CCol sm={3}>
                  <CFormSelect size="sm" className="mb-3" id="ddlWarehouse" aria-label="select warehouse"
                    value={searchInfo.ddlWarehouse} onChange={(e) => { handleSearchUpdate(e, 'ddlWarehouse'); }}>
                    <option>All</option>
                    <option value="1">All</option>
                    <option value="2"> Warehouse 1</option>
                    <option value="3">Warehouse 2</option>
                  </CFormSelect>
                </CCol>
                <CCol sm={2}> </CCol>
                <CFormLabel htmlFor="txtCity" className="col-sm-2">City :</CFormLabel>
                <CCol sm={3}><CFormInput className="mb-3" type="text" id="txtCity"
                  value={searchInfo.txtCity} onChange={(e) => { handleSearchUpdate(e, 'txtCity'); }} /> </CCol>
              </CRow>
              <CRow className="mb-">
                <CCol sm={4}> <CFormCheck inline id="loadDelivered" label="Load not delivered" value={searchInfo.loadDelivered}
                  checked={searchInfo.loadDelivered} onChange={(e) => { handleSearchUpdate(e, 'loadDelivered'); }}
                /></CCol>
                <CCol sm={4}>  <CFormCheck inline id="loadShipped" label="Load not shipped" value={searchInfo.loadShipped}
                  checked={searchInfo.loadShipped} onChange={(e) => { handleSearchUpdate(e, 'loadShipped'); }} /></CCol>
                <CCol sm={4}> <CFormCheck inline id="loadNotReadyPickup" label="Load not ready for pickup" value={searchInfo.loadNotReadyPickup}
                  checked={searchInfo.loadNotReadyPickup} onChange={(e) => { handleSearchUpdate(e, 'loadNotReadyPickup'); }} /></CCol>
              </CRow>
              <CRow className="mb-1">
                <CCol xs={12}>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton shape="rounded-0" color="info" variant="outline" onClick={() => serachHandled() }>
                      <CIcon className="text-info" icon={cilSearch} /> &nbsp;Search
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </CCard>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CTable align="middle" className="mb-0 border mt-1" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell> &nbsp; </CTableHeaderCell>
                  <CTableHeaderCell> <CFormCheck /></CTableHeaderCell>
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

                {shipments.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <CTableRow v-for="item in shipments" key={index}>
                        <CTableDataCell>
                          <div> <CIcon className="text-info" icon={item.showProduct ? cilCaretBottom : cilCaretRight} onClick={() => expandCollapseProduct(item)} /> </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div><CFormCheck /></div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.shipmentNo}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.orderNo}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.pickupFromStore ? <CIcon className="text-info" icon={cilCheckCircle} /> :
                            <CIcon className="text-danger" icon={cilXCircle} />} </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.trackingNumber}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.totalWeight} [lb(s)]</div>
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
                      {
                        item.showProduct && (<CTableRow key={(index + 100)}>
                          <CTableHeaderCell colSpan={11}>
                            <CTable align="middle" className="mb-0 border mt-1" hover responsive>
                              <CTableHead color="light">
                                <CTableRow>
                                  <CTableHeaderCell>Product</CTableHeaderCell>
                                  <CTableHeaderCell>Warehouse</CTableHeaderCell>
                                  <CTableHeaderCell>Qty shipped</CTableHeaderCell>
                                  <CTableHeaderCell>Item weight</CTableHeaderCell>
                                  <CTableHeaderCell>Item dimensions</CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                {
                                  item.productDetails && item.productDetails.map((p, pi) => (
                                    <CTableRow v-for="product in productDetails" key={pi}>
                                      <CTableDataCell><div>{p.name}</div></CTableDataCell>
                                      <CTableDataCell><div>{p.warehouse}</div></CTableDataCell>
                                      <CTableDataCell><div>{p.qtyShipped}</div></CTableDataCell>
                                      <CTableDataCell><div>{p.itemWeight}</div></CTableDataCell>
                                      <CTableDataCell><div>{p.dimensions}</div></CTableDataCell>
                                    </CTableRow>
                                  ))
                                }
                              </CTableBody>
                            </CTable>
                          </CTableHeaderCell>
                        </CTableRow>
                        )
                      }
                    </React.Fragment>
                  )
                }
                )}
              </CTableBody>
            </CTable>
          </CRow>
        </CCardBody>
      </CCard>
    </React.Fragment>
  )
}

export default ShipmentList
