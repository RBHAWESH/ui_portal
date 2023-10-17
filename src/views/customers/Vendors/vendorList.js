import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { useNavigate } from "react-router-dom";
import masterApi from "../../api/master.api";
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
    CRow
} from '@coreui/react'
import {
    cilPencil, cilPlus
} from '@coreui/icons'

const Vendors = () => {
    const [vendors, setVendors] = useState([]);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/master/vendor");
    }

    useEffect(() => {
        getAllVendors();
    }, [])

    const getAllVendors = async () => {
        masterApi.getAllVendors().then(result => {
            setVendors(result.data);
        });
    }

    const handleEditClick = (id) => {
        navigate("/master/vendor/" + id);
    }

    return (
        <>
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
                        <CTable align="middle" className="mb-0 border mt-1" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>

                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Published</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {vendors.map((item, index) => (
                                    <CTableRow v-for="item in tableItems" key={index}>

                                        <CTableDataCell>
                                            <div>{item.name}</div>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CFormSwitch checked={item.published} defaultChecked disabled />
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

export default Vendors
