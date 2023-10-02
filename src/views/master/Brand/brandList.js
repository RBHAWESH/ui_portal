import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { useNavigate } from "react-router-dom";
import masterApi from "../../api/master.api";
import xlsxfile from 'src/views/common/utilities/excel';
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
    CInputGroup,
    CFormInput
} from '@coreui/react'
import {
    cilPencil, cilPlus
} from '@coreui/icons'

const Dashboard = () => {
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/master/brand");
    }

    useEffect(() => {
        masterApi.getBrands().then(result => {
            setBrands(result.data);
        });
    }, [])

    const handleFileChange = async (e) => {
        const data = await xlsxfile.read(e);
        console.log("excel data", data);
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
                        <div className="col-sm-6 justify-content-md-end">
                            <CInputGroup className="mb-1">
                                <CFormInput onChange={handleFileChange} type="file" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                                <CButton type="button" size="sm" color="info" variant="outline" id="inputGroupFileAddon04">Import</CButton>
                            </CInputGroup>
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
                                {brands.map((item, index) => (
                                    <CTableRow v-for="item in tableItems" key={index}>

                                        <CTableDataCell>
                                            <div>{item.name}</div>

                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CFormSwitch checked={item.published} defaultChecked disabled />
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
