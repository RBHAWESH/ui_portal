import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { useNavigate } from "react-router-dom";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CCard,
  CCardBody,
  CRow,
  CImage,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import {
  cilPencil, cilPlus
} from '@coreui/icons'
import accountapi from 'src/views/api/account.api';
import 'src/views/sales/Order/orderPdf.css'
import { PdfWindow } from './pdfWindow';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [invoice, setInvoice] = useState({});
  const [showPdfWindow, setShowPdfWindow] = useState(false)
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/master/banner");
  }

  useEffect(() => {
    getAllOrders();
  }, [])

  //useEffect(() => {
  //  getInvoiceData();
  //}, [])

  const getAllOrders = async () => {
    accountapi.getAllOrders().then(result => {
      setOrders(result.data);
    });
  }

  const getInvoiceData = async () => {
    accountapi.getInvoiceDetails().then(result => {
      setInvoice(result.data[0])
      console.log("invoice", invoice)
    });
  }

  const handleEditClick = (id) => {
    navigate("/master/banner/" + id);
  }

  const invoiceTest = {
    "orderid": "4862b8ea-8c08-11ee-96b4-5cba2c200177",
    "orderdate": "26.11.2023",
    "buyername": "wallerb@gmail.com",
    "orderstatus": "Confirmed",
    "grantotal": "912",
    "totaltaxamount": 0,
    "grantotalinwords": "Nine hundred and twelve ",
    "products": [
      {
        "qty": 2,
        "itemsubtotal": 910,
        "productname": "Dr. Talbot's, Infrared Thermometer, White, 1 Thermometer",
        "asin": "B09XMVTNQQ",
        "sku": "TAL-14903",
        "image": "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now00495/v/39.jpg"
      },
      {
        "qty": 2,
        "itemsubtotal": 910,
        "productname": "Equal, Zero Calorie Sweetener, Original, 230 Packets",
        "asin": "B0BVW7Q41W",
        "sku": "EQA-10935",
        "image": "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now00495/v/39.jpg"
      }
    ],
    "shippadress": {
      "add": "Flat no 101, Aman Niwas, Sector 19B, Plot no 15B, Ulwe",
      "City": "Panvel",
      "State": "Maharashtra",
      "Zip": 400070,
      "code": "IN"
    },
    "billingadress": {
      "add": "Flat no 402, Gaurav Pride, Sector 9, Plot no 78, Ulwe",
      "City": "Panvel",
      "State": "Maharashtra",
      "Zip": 400070,
      "code": "IN"
    },
    "invoicedetails": {
      "Invoice Number": "IN-32728",
      "Invoice Details": "MH-181834501-2324",
      "Invoice Date": "13.12.2023",
      "transactionid": "28N2NuBrHWbGSz4POBpo",
      "paymenttime": "13/12/2023, 13:13:49",
      "total": "912",
      "mode": "cod"
    },
    "companydetails": {
      "name": "Global365 Online Shopping",
      "add": "4B21 4th Floor Phoenix Paragon Plaza, LBS Marg Kamani Junction Kurla West Mumbai, MAHARASHTRA, 400070 IN",
      "pan": "AHUPY3295Q",
      "gst": "27AHUPY3295Q1ZT",
      "fssai": "10018022008525"
    }
  }

  const handlePrintSlipClick = () => {
    debugger;
    /*    console.log(orderId)*/
    if (invoiceTest && Object.keys(invoiceTest).length > 0) {
      setShowPdfWindow(!showPdfWindow);
    }
  }

  return (
    <div className="notranslate">
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <div className="col-sm-6 justify-content-md-end">
              <CButton onClick={handleClick} shape="rounded-0" size="sm" color="info" variant="outline">
                Add New      <CIcon className="text-info" icon={cilPlus} />
              </CButton>
            </div>
          </CRow>
          <CRow>
            <CTable align="middle" style={{ fontSize: '12px' }} className="mb-0 border mt-1" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>Order Date</CTableHeaderCell>
                  <CTableHeaderCell>Order Details</CTableHeaderCell>
                  <CTableHeaderCell>Image</CTableHeaderCell>
                  <CTableHeaderCell>Product Name</CTableHeaderCell>
                  <CTableHeaderCell>Customer Option</CTableHeaderCell>
                  <CTableHeaderCell>Order Status</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orders.map((item, index) => (
                  <CTableRow v-for="item in orders" key={index}>
                    <CTableDataCell>
                      <div><strong>{item.time}</strong></div>
                      <div>{item.orderdate}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.orderid}</div>
                      <div>Buyer name: {item.buyername}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.products.map((p, pi) => (
                        <div v-for="item in orders" key={pi}>
                          <div>
                            <CImage src={p.image} width={90} height={90} />
                          </div>
                        </div>
                      ))}

                    </CTableDataCell>
                    <CTableDataCell>
                      {item.products.map((p, pi) => (
                        <div v-for="item in orders" key={pi}>
                          <div>
                            Product name : {p.productname}
                          </div>
                          <div>ASIN: {p.asin}</div>
                          <div>SKU: {p.sku}</div>
                          <div>Quantity: {p.qty}</div>
                          <div>Item Subtotal: {p.itemsubtotal}</div>
                          <br />
                        </div>
                      ))}

                    </CTableDataCell>
                    <CTableDataCell>
                      <div>Ship by Date: {item?.shippingdetails?.shipdate}</div>
                      <div>Delivery by Date: {item?.shippingdetails?.deliverydate}</div>
                      <div>Recommended Carrier{item?.shippingdetails?.courier}</div>
                    </CTableDataCell>

                    <CTableDataCell className="text-center">
                      <div>{item.orderstatus}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>
                        <CButton style={{ fontSize: '12px' }} onClick={() => handleEditClick(item.id)} color="info" variant="outline">
                          Self Deliver <CIcon className="text-info" icon={cilPencil} />
                        </CButton>
                      </div>
                      <div>
                        <CButton style={{ fontSize: '12px' }} onClick={() => handleEditClick(item.id)} color="info" variant="outline">
                          Confirm Shipment  <CIcon className="text-info" icon={cilPencil} />
                        </CButton>
                      </div>
                      <div>
                        <CButton style={{ fontSize: '12px' }} onClick={() => { setOrderId(item.orderid); handlePrintSlipClick(); }} color="info" variant="outline">
                          Printing packge slip <CIcon className="text-info" icon={cilPencil} />
                        </CButton>
                      </div>
                      <div>
                        <CButton style={{ fontSize: '12px' }} onClick={() => handleEditClick(item.id)} color="info" variant="outline">
                          Print tax invoice  <CIcon className="text-info" icon={cilPencil} />
                        </CButton>
                      </div>
                      <div>
                        <CButton style={{ fontSize: '12px' }} onClick={() => handleEditClick(item.id)} color="info" variant="outline">
                          Cancel Order <CIcon className="text-info" icon={cilPencil} />
                        </CButton>
                      </div>

                    </CTableDataCell>

                  </CTableRow>
                ))}
              </CTableBody>

            </CTable>
            <CPagination align="center" aria-label="Page navigation example">
              <CPaginationItem disabled>Previous</CPaginationItem>
              <CPaginationItem active>1</CPaginationItem>
              <CPaginationItem>2</CPaginationItem>
              <CPaginationItem>3</CPaginationItem>
              <CPaginationItem>Next</CPaginationItem>
            </CPagination>
          </CRow>
        </CCardBody>
      </CCard>
      {showPdfWindow && (
        <PdfWindow closePdfWindow={() => handlePrintSlipClick(0)}>
          <div className='invoice-box' id="invoicebox">
            <table cellPadding={0} cellSpacing={0}>
              <tr className='top'>
                <td colSpan={2} >
                  <table>
                    <tr>
                      <td className='title'>
                        <img src='/'
                          style={{ color: "red" }} />
                      </td>
                      <td>
                        <b>Tax Invoice/Bill of Supply/Cash Memo</b><br />
                        (Triplicate for Supplier)
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr className='information'>
                <td colSpan={2}>
                  <table>
                    <tr>
                      <td>
                        <b>Sold By :</b> {invoiceTest.companydetails.name} <br />
                        {invoiceTest.companydetails.add}
                      </td>
                      <td>
                        <b>
                          Billing Address :
                        </b>
                        {invoiceTest.billingadress.add}
                        {invoiceTest.billingadress.City}, {invoiceTest.billingadress.State}, {invoiceTest.billingadress.Zip}
                        {invoiceTest.billingadress.code}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>PAN No: </b> {invoiceTest.companydetails.pan}<br />
                        <b>GST Registration No:</b> {invoiceTest.companydetails.gst}<br />
                        <b> FSSAI License No.</b>
                        {invoiceTest.companydetails.fssai}
                      </td>
                      <td>
                        <b> Shipping Address :</b>
                        {invoiceTest.shippadress.add}
                        {invoiceTest.shippadress.City}, {invoiceTest.shippadress.State}, {invoiceTest.shippadress.Zip}
                        {invoiceTest.shippadress.code}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Order Number: </b> {invoiceTest.orderid} <br />
                        <b>Order Date:</b> {invoiceTest.orderdate} <br />
                      </td>
                      <td>
                        <b>Invoice Number :</b> {invoiceTest.invoicedetails['Invoice Number']} <br />
                        <b>Invoice Details :</b> {invoiceTest.invoicedetails['Invoice Details']} <br />
                        <b>Invoice Date :</b> {invoiceTest.invoicedetails['Invoice Date']}<br />
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr className='information'>
                <td colSpan={2}>
                  <table className="tbl-description" id="tbl-description">
                    <tr className='heading' >
                      <td> Sl. No</td>
                      <td>Quantity</td>
                      <td>Item Subtotal</td>
                      <td>Product Name</td>
                      <td>ASIN</td>
                      <td>SKU</td>
                      <td>Tax Amount</td>
                      <td>Image</td>
                    </tr>
                    {invoiceTest.products.map((item, index) => (
                      <tr className='item'>
                        <td> {index}</td>
                        <td>{item.qty}</td>
                        <td>₹ {item.itemsubtotal}</td>
                        <td>{item.productname}</td>
                        <td>{item.asin}</td>
                        <td>{item.sku}</td>
                        <td>0</td>
                        <td>  <CImage src={item.image} width={90} height={90} /> </td>
                      </tr>
                    ))}
                    <tr className='item last'>
                      <td colSpan={6}><b>TOTAL:</b></td>
                      <td><b>₹ 0</b></td>
                      <td><b>₹ {invoiceTest.grantotal}</b></td>
                    </tr>
                    <tr className='item last'>
                      <td colSpan={9}><b>Amount in Words: <br /> {invoiceTest.grantotalinwords}</b></td>
                    </tr>
                    {/*<tr className='item last'>*/}
                    {/*  <td colSpan={9}>*/}
                    {/*    <b>For Global365 Online Shopping:</b> <br />*/}
                    {/*    <img src="#" height="10" width="10" style={{ background: '#eee' }} />*/}
                    {/*    <br />*/}
                    {/*    <b>Authorized Signatory</b>*/}
                    {/*  </td>*/}
                    {/*</tr>*/}
                  </table>
                  <br />
                  <table className="tbl-description" >
                    <tr className='item' >
                      <td ><b>Payment Transaction ID:</b>{invoiceTest.invoicedetails.transactionid}</td>
                      <td><b>Date & Time:</b>{invoiceTest.invoicedetails.paymenttime}</td>
                      <td><b>Invoice Value:</b>{invoiceTest.invoicedetails.total}</td>
                      <td><b>Mode of Payment:</b>{invoiceTest.invoicedetails.mode}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </PdfWindow>
      )}
    </div>
  )
}

export default Orders
