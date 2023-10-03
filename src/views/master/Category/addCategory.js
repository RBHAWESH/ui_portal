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
    CFormSelect,
} from '@coreui/react'
import masterapi from 'src/views/api/master.api'
import { Category } from 'src/views/model/category.model'


const CustomStyles = () => {
    const [validated, setValidated] = useState(false)
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(Category.getEmptyCategory());
    const params = useParams();
    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
        masterapi.saveCategory(category).then(result => {
            if (result && result.data)
                alert(result.data);
        });
    }
    useEffect(() => {
        masterapi.getPublishedCategories().then(result => {
            setCategories(result.data);
        });

        if (params.id !== undefined && params.id !== null && params.id !== 0)
            masterapi.getCategoryById(params.id).then(result => {
                if (result.data) {
                    setCategory({ ...result.data });
                }
            });
    }, [params?.id])
    const handleUpdate = (e, key) => {
        category[key] = e.target.value;
        setCategory({ ...category });
    }
    return (
        <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
        >
            <CCol md={4}>
                <CFormLabel htmlFor="Name">Category Name</CFormLabel>
                <CFormInput value={category.Name} onChange={(e) => { handleUpdate(e, 'Name'); }} type="text" id="Name" required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={4}>
                <CFormLabel htmlFor="parentcategoryid">Select Sub Category</CFormLabel>
                <CFormSelect id="parentcategoryid" value={category.parentcategoryid} onChange={(e) => { handleUpdate(e, 'parentcategoryid'); }}>
                    <option value={0}>Choose...</option>
                    {categories.map((item) => <option value={item?.id} >{item?.Name}</option>)}
                </CFormSelect>
                <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
                <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={4}>
                <CFormLabel htmlFor="displayorder">Display Order</CFormLabel>
                <CFormInput value={category.displayorder} onChange={(e) => { handleUpdate(e, 'displayorder'); }} type="text" id="displayorder" required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={12}>
                <CFormLabel htmlFor="published">Published</CFormLabel>
                <CFormSwitch id="published" checked={category.published} onChange={(e) => { category.published = !category.published; setCategory({ ...category }); }} />
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
