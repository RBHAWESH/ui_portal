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
    CRow,
} from '@coreui/react'
import {
    cilPencil, cilPlus
} from '@coreui/icons'

const Dashboard = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/master/category");
    }

    useEffect(() => {
        masterApi.getCategories().then(result => {
            setCategories(result.data);
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

                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Published</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {categories.map((item, index) => (
                                    <CTableRow v-for="item in categories" key={index}>

                                        <CTableDataCell>
                                            <div>{item.Name}</div>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CFormSwitch id="formSwitchCheckCheckedDisabled" checked={item.published} disabled />
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CButton color="info" variant="outline">
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
