import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormSelect,
  CFormLabel,
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
      console.log("Orders", orders)
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
    if (invoiceTest && Object.keys(invoiceTest).length > 0) {
      setShowPdfWindow(!showPdfWindow);
    }
  }

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // No of pages
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = orders.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(orders.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);


  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const changePage = (n) => {
    setCurrentPage(n);
  }

  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  // Dropdown filter
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [orderDate, setOrderDate] = useState('Descending');
  const handleClickDDl = (e, key) => {
    if (key === 'orderDate') {
      if (e.target.value === 'Ascending') {
        records.sort(a => a.orderdate)
      }
    } 
    if (key === 'recordPerPage') setRecordsPerPage(e.target.value);
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
            <div className="col-sm-6 justify-content-md-end">
              <div className="row">
                <div className="col-sm-5">
                  <CFormSelect size="sm" id="orderDate" value={orderDate} onChange={(e) => { handleClickDDl(e, 'orderDate'); }}>
                    <option value='Ascending'>Order date (ascending)</option>
                    <option value='Descending'>Order date (descending)</option>
                  </CFormSelect>
                </div>
                <div className="col-sm-5">
                  <CFormSelect size="sm" id="recordPerPage" value={recordsPerPage} onChange={(e) => { handleClickDDl(e, 'recordPerPage'); }}>
                    <option value={5} > results per page 5</option>
                    <option value={10} >results per page 10</option>
                    <option value={15} >results per page 15</option>
                    <option value={20} >results per page 20</option>
                  </CFormSelect>
                </div>
              </div>
              <div className="row" style={{ marginTop: '10px' }}>
                <div className="col-sm-5">
                  <CFormLabel htmlFor="fromDate">From</CFormLabel>
                  <DatePicker id="fromDate" selected={fromDate} onChange={(date) => setFromDate(date)} />
                </div>
                <div className="col-sm-5">
                  <CFormLabel htmlFor="toDate">To</CFormLabel>
                  <DatePicker id="toDate" selected={toDate} onChange={(date) => setToDate(date)} />
                </div>
              </div>
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
                {records.map((item, index) => (
                  <CTableRow v-for="item in records" key={index}>
                    <CTableDataCell>
                      <div><strong>{item.time}</strong></div>
                      <div>{item.orderdate}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div><a className="a-text-underline" href="#">{item.orderid}</a></div>
                      <div>Buyer name: {item.buyername}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.products.map((p, pi) => (
                        <div v-for="item in records" key={pi}>
                          <div>
                            <CImage src={p.image} width={90} height={90} />
                          </div>
                        </div>
                      ))}

                    </CTableDataCell>
                    <CTableDataCell>
                      {item.products.map((p, pi) => (
                        <div v-for="item in records" key={pi}>
                          <div>
                            Product name : <a className="a-text-underline" href="#">{p.productname}</a>
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
                      <div><label className={"btn btn-sm btn-" + (item.orderstatus === 'Confirmed' ? 'primary' : 'danger')} >{item.orderstatus}</label></div>
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
              <CPaginationItem disabled={currentPage === 1} onClick={() => prevPage()}>Previous</CPaginationItem>
              {
                numbers.map((n, i) => (
                  <CPaginationItem key={i} active={currentPage === n} onClick={() => changePage(n)}>{n}</CPaginationItem>
                ))
              }
              <CPaginationItem disabled={currentPage === nPage} onClick={() => nextPage()}>Next</CPaginationItem>
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
