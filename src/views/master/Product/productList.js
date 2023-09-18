import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { useNavigate } from "react-router-dom";
import productApi from "../../api/product.api";
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CFormSwitch,
    CButton,
    CCard,
    CCardBody,
    CRow,
    CAvatar
} from '@coreui/react'
import {
    cilPencil, cilPlus
} from '@coreui/icons'

const Dashboard = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/master/product");
    }

    const handleEditClick = (id) => {
        navigate("/master/product/" + id);
    }

    const [products, setProducts] = useState([]);

    useEffect(() => {
        productApi.getProducts().then(result => {
            setProducts(result.data);
        });
    }, [])

    return (
        <>
            <CCard className="mb-4">
                <CCardBody>

                    <CRow>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <CButton onClick={handleClick} shape="rounded-0" size="sm" color="info" variant="outline">
                                Add New      <CIcon className="text-info" icon={cilPlus} />
                            </CButton>
                        </div>
                    </CRow>
                    <CRow>
                        <CTable align="middle" className="mb-0 border mt-1" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell>Image</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>SKU</CTableHeaderCell>
                                    <CTableHeaderCell>ASIN</CTableHeaderCell>
                                    <CTableHeaderCell>Quantity</CTableHeaderCell>
                                    <CTableHeaderCell>Price</CTableHeaderCell>
                                    <CTableHeaderCell>Published</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {products.map((item, index) => (
                                    <CTableRow v-for="item in products" key={index}>

                                        <CTableDataCell>
                                            <CAvatar size="md" />
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.Name}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.sku}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.asin}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.stockquantity}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.price}</div>
                                        </CTableDataCell>



                                        <CTableDataCell className="text-center">
                                            <CFormSwitch value={item.published} id="formSwitchCheckCheckedDisabled" defaultChecked disabled />
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CButton onClick={() => handleEditClick(item.id)} color="info" variant="outline">
                                                <CIcon className="text-info" icon={cilPencil} />
                                            </CButton>
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

export default Dashboard
