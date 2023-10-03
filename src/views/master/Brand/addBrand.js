import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
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
import { Brand } from 'src/views/model/brand.model';
import masterapi from 'src/views/api/master.api';



const CustomStyles = () => {
    const [validated, setValidated] = useState(false)
    const [brand, setBrand] = useState(Brand.getEmptyBrand());
    const params = useParams();
    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)

        masterapi.saveBrand(brand).then(result => {
            if (result && result.data)
                alert(result.data);
        });
    }
    const handleUpdate = (e, key) => {
        brand[key] = e.target.value;
        setBrand({ ...brand });
    }
    useEffect(() => {
        if (params.id !== undefined && params.id !== null && params.id !== 0)
            masterapi.getBrandById(params.id).then(result => {
                if (result.data) {
                    setBrand({ ...result.data });
                }
            });
    }, [params?.id])
    return (
        <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
        >
            <CCol md={4}>
                <CFormLabel htmlFor="name">Brand Name</CFormLabel>
                <CFormInput value={brand.name} onChange={(e) => { handleUpdate(e, 'name'); }} type="text" id="name" required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={4}>
                <CFormLabel htmlFor="display_order">Display Order</CFormLabel>
                <CFormInput value={brand.display_order} onChange={(e) => { handleUpdate(e, 'display_order'); }} type="text" id="display_order" required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={12}>
                <CFormLabel htmlFor="published">Published</CFormLabel>
                <CFormSwitch checked={brand.published} onChange={(e) => { brand.published = !brand.published; setBrand({ ...brand }); }} id="published" />
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
