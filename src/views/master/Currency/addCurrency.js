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
import masterapi from 'src/views/api/master.api';
import { Currency } from 'src/views/model/currency.model';

const CustomStyles = () => {
    const [validated, setValidated] = useState(false)
    const [currency, setCurrency] = useState(Currency.getEmptyCurrency());
    const params = useParams();
    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
        masterapi.saveCurrency(currency).then(result => {
            if (result && result.data)
                alert(result.data);
        });
    }
    useEffect(() => {
        if (params.id !== undefined && params.id !== null && params.id !== 0)
            masterapi.getCurrencyById(params.id).then(result => {
                if (result.data) {
                    setCurrency({ ...result.data });
                }
            });
    }, [params?.id])
    const handleUpdate = (e, key) => {
        currency[key] = e.target.value;
        setCurrency({ ...currency });
    }
    return (
        <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
        >
            <CCol md={4}>
                <CFormLabel htmlFor="name">Name/Code	</CFormLabel>
                <CFormInput value={currency.name} onChange={(e) => { handleUpdate(e, 'name'); }} type="text" id="name" required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={4}>
                <CFormLabel htmlFor="symbol">Symbol	</CFormLabel>
                <CFormInput value={currency.symbol} onChange={(e) => { handleUpdate(e, 'symbol'); }} type="text" id="symbol" required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={4}>
                <CFormLabel htmlFor="exchange_rate">Exchange Rate	</CFormLabel>
                <CFormInput value={currency.exchange_rate} onChange={(e) => { handleUpdate(e, 'exchange_rate'); }} type="text" id="exchange_rate" required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={4}>
                <CFormLabel htmlFor="is_primary">Is Primary</CFormLabel>
                <CFormSwitch checked={currency.is_primary} onChange={(e) => { currency.is_primary = !currency.is_primary; setCurrency({ ...currency }); }} id="is_primary" />
            </CCol>
            <CCol md={4}>
                <CFormLabel htmlFor="published">Published</CFormLabel>
                <CFormSwitch checked={currency.published} onChange={(e) => { currency.published = !currency.published; setCurrency({ ...currency }); }} id="published" />
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
