import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormFeedback,
    CFormLabel,
    CFormSwitch,
    CRow,
} from '@coreui/react'

const CustomStyles = () => {
    const [validated, setValidated] = useState(false)
    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
    }
    return (
        <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
        >
            <CCol md={4}>
                <CFormLabel htmlFor="validationCustom01">Brand Name</CFormLabel>
                <CFormInput type="text" id="validationCustom01"  required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={12}>
                <CFormLabel htmlFor="validationCustom02">Published</CFormLabel>
                <CFormSwitch id="formSwitchCheckCheckedDisabled" defaultChecked />
            </CCol>
            
            <CCol xs={12}>
                <CButton type="submit" shape="rounded-0" color="info" variant="outline">
                    Submit form
                </CButton>
            </CCol>
        </CForm>
    )
}

const Validation = () => {
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Add New</strong>
                    </CCardHeader>
                    <CCardBody>

                        <div >{CustomStyles()}</div>
                    </CCardBody>
                </CCard>
            </CCol>


        </CRow>
    )
}

export default Validation
