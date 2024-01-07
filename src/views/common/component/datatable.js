import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CFormSwitch,
    CButton,
    CImage,
    CPagination,
    CPaginationItem
} from '@coreui/react'
import {
    cilPencil, cilPlus
} from '@coreui/icons'

const Datatable = (headers, data) => {


    return (
        <>
            <CTable align="middle" className="mb-0 border mt-1" hover responsive>
                <CTableHead color="light">
                    <CTableRow>
                        <CTableHeaderCell>Image</CTableHeaderCell>
                        <CTableHeaderCell>Name</CTableHeaderCell>
                        <CTableHeaderCell>Discount Text</CTableHeaderCell>
                        <CTableHeaderCell>Display Order</CTableHeaderCell>
                        <CTableHeaderCell>Page Route</CTableHeaderCell>
                        <CTableHeaderCell>Published</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {data.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                            <CTableDataCell>
                                <CImage src={item.imgsrc} width={90} height={90} />
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{item.name}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{item.discounttext}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{item.display_order}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{item.pageroute}</div>
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
            {/* <CPagination align="center" aria-label="Page navigation example">
                    <CPaginationItem disabled>Previous</CPaginationItem>
                    <CPaginationItem active>1</CPaginationItem>
                    <CPaginationItem>2</CPaginationItem>
                    <CPaginationItem>3</CPaginationItem>
                    <CPaginationItem>Next</CPaginationItem>
                </CPagination> */}
        </>
    )
}

export default Datatable
