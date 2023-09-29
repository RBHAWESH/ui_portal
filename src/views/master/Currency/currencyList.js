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
    const [currency, setCurrency] = useState([]);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/master/currency");
    }
    useEffect(() => {
        masterApi.getCurrency().then(result => {
            setCurrency(result.data);
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

                                    <CTableHeaderCell>Name/Code</CTableHeaderCell>
                                    <CTableHeaderCell>Symbol</CTableHeaderCell>
                                    <CTableHeaderCell>Exchange Rate</CTableHeaderCell>
                                    <CTableHeaderCell>Published</CTableHeaderCell>
                                    <CTableHeaderCell>Is Primary</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {currency.map((item, index) => (
                                    <CTableRow v-for="item in currency" key={index}>

                                        <CTableDataCell>
                                            <div>{item.name}</div>
                                           
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.symbol}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.exchange_rate}</div>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CFormSwitch id="published" checked={item.published} disabled />
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CFormSwitch id="is_primary" checked={item.is_primary} disabled />
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
