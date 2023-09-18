import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Product } from '../../model/product.model';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import productApi from "../../api/product.api";
import masterapi from "../../api/master.api";
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
    CFormTextarea,
} from '@coreui/react'

const CustomStyles = () => {
    const [validated, setValidated] = useState(false);
    const [product, setProduct] = useState(Product.getEmptyProduct());
    const [startDate, setStartDate] = useState(new Date());
    const [endtDate, setEndDate] = useState(new Date());
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [producttypes, setProducttypes] = useState([]);
    const [producttemplates, setProducttemplates] = useState([]);
    const [producttaxcategories, setProducttaxcategories] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [customerroles, setCustomerroles] = useState([]);
    const [deliverydates, setDeliverydates] = useState([]);
    const [stores, setStores] = useState([]);

    const params = useParams();

    const handleUpdate = (e, key) => {
        console.log(e);
        if (key !== 'markasnewenddatetimeutc' && key !== 'markasnewstartdatetimeutc') {
            product[key] = e.target.value;
        }
        setProduct({ ...product });
    }

    const onEditorStateChange = (editorState) => {
        product.fulldescription = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setProduct({ ...product });
        console.log(product);
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        console.log("data", product);
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)

        productApi.saveProduct(product).then(result => {
            if (result && result.data)
                alert(result.data );
        });
    }

    useEffect(() => {
        getBrands();
        getCategories();
        getProductTemplate();
        getProductTypes();
        getProductTaxCategory();
        getCustomerRoles();
        getDeliveryDates();
        getVendors();
        getStores();
        if (params.id !== undefined && params.id !== null && params.id !== 0)
            productApi.getProductById(params.id).then(result => {
                if (result.data)
                    setProduct({ ...result.data });
            });
    }, [params?.id])

    const getBrands = () => {
        masterapi.getPublishedBrands().then(result => {
            if (result.data)
                setBrands(result.data);
        });
    }

    const getCategories = () => {
        masterapi.getPublishedCategories().then(result => {
            if (result.data)
                setCategories(result.data);
        });
    }

    const getProductTypes = () => {
        masterapi.getProductTypes().then(result => {
            if (result.data)
                setProducttypes(result.data);
        });
    }

    const getProductTaxCategory = () => {
        masterapi.getProductTaxCategory().then(result => {
            if (result.data)
                setProducttaxcategories(result.data);
        });
    }

    const getProductTemplate = () => {
        masterapi.getProductTemplate().then(result => {
            if (result.data)
                setProducttemplates(result.data);
        });
    }

    const getDeliveryDates = () => {
        masterapi.getDeliveryDates().then(result => {
            if (result.data)
                setDeliverydates(result.data);
        });
    }

    const getCustomerRoles = () => {
        masterapi.getCustomerRoles().then(result => {
            if (result.data)
                setCustomerroles(result.data);
        });
    }

    const getVendors = () => {
        masterapi.getVendors().then(result => {
            if (result.data)
                setVendors(result.data);
        });
    }

    const getStores = () => {
        masterapi.getStores().then(result => {
            if (result.data)
                setStores(result.data);
        });
    }

    return (

        <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
        >
            <CRow>
                <CCol xs={12}>
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol xs={12}>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <CButton className='text-right' type="submit" shape="rounded-0" color="info" variant="outline">
                                            Submit form
                                        </CButton>
                                        <CButton className='text-right' shape="rounded-0" color="info" variant="outline">
                                            Back
                                        </CButton>
                                    </div>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Product Info</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="productName">Product Name</CFormLabel>
                                    <CFormInput value={product.Name} onChange={(e) => { handleUpdate(e, 'Name'); }} type="text" id="productName" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="category">Select Category</CFormLabel>
                                    <CFormSelect value={product.categoryid} onChange={(e) => { handleUpdate(e, 'categoryid'); }} id="category">
                                        <option value={0}>Choose...</option>
                                        {categories.map((item, index) => <option value={item?.id} >{item?.Name}</option>)}
                                    </CFormSelect>
                                    <CFormFeedback invalid>Please provide a Category.</CFormFeedback>

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="brand">Select Brand</CFormLabel>
                                    <CFormSelect value={product.brandid} onChange={(e) => { handleUpdate(e, 'brandid'); }} id="brand">
                                        <option value={0}>Choose...</option>
                                        {brands.map((item, index) => <option value={item?.id} >{item?.name}</option>)}
                                    </CFormSelect>
                                    <CFormFeedback invalid>Please provide a Category.</CFormFeedback>

                                </CCol>
                                <CCol md={12}>
                                    <CFormLabel htmlFor="published">Published</CFormLabel>
                                    <CFormSwitch checked={product.published} value={product.published} onChange={(e) => { handleUpdate(e, 'published'); }} id="published" />
                                </CCol>
                                <CCol md={12}>
                                    <CFormLabel htmlFor="shortdescription">Short description</CFormLabel>
                                    <CFormTextarea value={product.shortdescription} onChange={(e) => { handleUpdate(e, 'shortdescription'); }}
                                        id="shortdescription"
                                        rows={3}
                                    ></CFormTextarea>

                                </CCol>
                                <CCol md={12}>
                                    <CFormLabel >Full description</CFormLabel>
                                    {/* <CFormTextarea
                                        id="exampleFormControlTextarea1"
                                        rows={3}
                                    ></CFormTextarea> */}
                                    <Editor onEditorStateChange={onEditorStateChange} editorClassName="demo-editor"
                                    />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="sku">SKU</CFormLabel>
                                    <CFormInput value={product.sku} onChange={(e) => { handleUpdate(e, 'sku'); }} type="text" id="sku" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="asin">ASIN</CFormLabel>
                                    <CFormInput value={product.asin} onChange={(e) => { handleUpdate(e, 'asin'); }} type="text" id="asin" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="producttags">Product tags</CFormLabel>
                                    <CFormInput value={product.producttags} onChange={(e) => { handleUpdate(e, 'producttags'); }} type="text" id="producttags" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="gtin">GTIN (global trade item number)</CFormLabel>
                                    <CFormInput value={product.gtin} onChange={(e) => { handleUpdate(e, 'gtin'); }} type="text" id="gtin" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="manufacturerpartnumber">Manufacturer part number</CFormLabel>
                                    <CFormInput value={product.manufacturerpartnumber} onChange={(e) => { handleUpdate(e, 'manufacturerpartnumber'); }} type="text" id="manufacturerpartnumber" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="showonhomepage">Show on home page</CFormLabel>
                                    <CFormSwitch checked={product.showonhomepage} onChange={(e) => { handleUpdate(e, 'showonhomepage'); }} id="showonhomepage" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="producttype">Product type</CFormLabel>
                                    <CFormSelect value={product.typeid} onChange={(e) => { handleUpdate(e, 'typeid'); }} id="producttype">
                                        <option value={0}>Choose...</option>
                                        {producttypes.map((item, index) => <option value={item?.id} >{item?.name}</option>)}
                                    </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="producttemplate">Product template</CFormLabel>
                                    <CFormSelect value={product.templateid} onChange={(e) => { handleUpdate(e, 'templateid'); }} id="producttemplate">
                                        <option value={0}>Choose...</option>
                                        {producttemplates.map((item, index) => <option value={item?.id} >{item?.name}</option>)}
                                    </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="visibleindividually">Visible individually</CFormLabel>
                                    <CFormSwitch checked={product.visibleindividually} onChange={(e) => { handleUpdate(e, 'visibleindividually'); }} id="visibleindividually" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="parentgroupedproductid">Customer roles</CFormLabel>
                                    <CFormSelect value={product.customerroleid} onChange={(e) => { handleUpdate(e, 'customerroleid'); }} id="parentgroupedproductid">
                                        <option value={0}>Choose...</option>
                                        {customerroles.map((item, index) => <option value={item?.id} >{item?.name}</option>)}
                                    </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="storeid">Limited to stores</CFormLabel>
                                    <CFormSelect value={product.storeid} onChange={(e) => { handleUpdate(e, 'storeid'); }} id="storeid">
                                        <option value={0}>Choose...</option>
                                        {stores.map((item, index) => <option value={item?.id} >{item?.name}</option>)}
                                    </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="vendor">Vendor</CFormLabel>
                                    <CFormSelect value={product.vendorid} onChange={(e) => { handleUpdate(e, 'vendorid'); }} id="vendor">
                                        <option value={0}>Choose...</option>
                                        {vendors.map((item, index) => <option value={item?.id} >{item?.name}</option>)}
                                    </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="otherproductid">Require other products</CFormLabel>
                                    <CFormSwitch id="otherproductid" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="allowcustomerreviews">Allow customer reviews</CFormLabel>
                                    <CFormSwitch checked={product.allowcustomerreviews} onChange={(e) => { handleUpdate(e, 'allowcustomerreviews'); }} id="allowcustomerreviews" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="markasnewstartdatetimeutc">Available start date</CFormLabel>
                                    <DatePicker id="markasnewstartdatetimeutc" selected={startDate} onChange={(date) => setStartDate(date)} />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="markasnewenddatetimeutc">Available end date</CFormLabel>
                                    <DatePicker id="markasnewenddatetimeutc" selected={endtDate} onChange={(date) => setEndDate(date)} />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="markasnew">Mark as new</CFormLabel>
                                    <CFormSwitch checked={product.markasnew} onChange={(e) => { handleUpdate(e, 'markasnew'); }} id="markasnew" />

                                </CCol>
                                <CCol md={12}>
                                    <CFormLabel htmlFor="admincomment">Admin comment</CFormLabel>
                                    <CFormTextarea value={product.admincomment} onChange={(e) => { handleUpdate(e, 'admincomment'); }}
                                        id="admincomment"
                                        rows={3}
                                    ></CFormTextarea>

                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Prices</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="price">Price</CFormLabel>
                                    <CFormInput value={product.price} onChange={(e) => { handleUpdate(e, 'price'); }} type="number" id="price" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="oldprice">Old price</CFormLabel>
                                    <CFormInput value={product.oldprice} onChange={(e) => { handleUpdate(e, 'oldprice'); }} type="number" id="oldprice" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="productcost">Product cost</CFormLabel>
                                    <CFormInput value={product.productcost} onChange={(e) => { handleUpdate(e, 'productcost'); }} type="number" id="productcost" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="disablebuybutton">Disable buy button</CFormLabel>
                                    <CFormSwitch checked={product.disablebuybutton} onChange={(e) => { handleUpdate(e, 'Name'); }} id="disablebuybutton" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="disablewishlistbutton">Disable wishlist button</CFormLabel>
                                    <CFormSwitch checked={product.disablewishlistbutton} onChange={(e) => { handleUpdate(e, 'disablewishlistbutton'); }} id="disablewishlistbutton" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="availableforpreorder">Available for pre-order</CFormLabel>
                                    <CFormSwitch checked={product.availableforpreorder} onChange={(e) => { handleUpdate(e, 'availableforpreorder'); }} id="availableforpreorder" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="callforprice">Call for price</CFormLabel>
                                    <CFormSwitch checked={product.callforprice} onChange={(e) => { handleUpdate(e, 'callforprice'); }} id="callforprice" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="customerentersprice">Customer enters price</CFormLabel>
                                    <CFormSwitch checked={product.customerentersprice} onChange={(e) => { handleUpdate(e, 'customerentersprice'); }} id="customerentersprice" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="basepriceamount">PAngV (base price) enabled</CFormLabel>
                                    <CFormSwitch checked={product.basepriceamount} onChange={(e) => { handleUpdate(e, 'basepriceamount'); }} id="basepriceamount" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="discount">Discounts</CFormLabel>
                                    <CFormSelect id="discount">
                                        <option value={0}>Choose...</option>
                                        <option value={1}>Discount 1</option>
                                    </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="istaxexempt">Tax exempt</CFormLabel>
                                    <CFormSwitch checked={product.istaxexempt} onChange={(e) => { handleUpdate(e, 'istaxexempt'); }} id="istaxexempt" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="taxcategory">Tax category</CFormLabel>
                                    <CFormSelect value={product.taxcategoryid} onChange={(e) => { handleUpdate(e, 'taxcategoryid'); }} id="taxcategory">
                                        <option value={0}>Choose...</option>
                                        {producttaxcategories.map((item, index) => <option value={item?.id} >{item?.name}</option>)}
                                    </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="istelecommunicationsorbroadcastingorelectronicservices">Telecommunications, broadcasting and electronic services</CFormLabel>
                                    <CFormSwitch checked={product.istelecommunicationsorbroadcastingorelectronicservices} onChange={(e) => { handleUpdate(e, 'istelecommunicationsorbroadcastingorelectronicservices'); }} id="istelecommunicationsorbroadcastingorelectronicservices" />

                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Shipping</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="isshipenabled">Shipping enabled</CFormLabel>
                                    <CFormSwitch checked={product.isshipenabled} onChange={(e) => { handleUpdate(e, 'isshipenabled'); }} id="isshipenabled" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="weight">Weight</CFormLabel>
                                    <CFormInput value={product.weight} onChange={(e) => { handleUpdate(e, 'weight'); }} type="number" id="weight" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="length">Length</CFormLabel>
                                    <CFormInput value={product.length} onChange={(e) => { handleUpdate(e, 'length'); }} type="number" id="length" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="width">Width</CFormLabel>
                                    <CFormInput value={product.width} onChange={(e) => { handleUpdate(e, 'width'); }} type="number" id="width" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="height">Height</CFormLabel>
                                    <CFormInput value={product.height} onChange={(e) => { handleUpdate(e, 'height'); }} type="number" id="height" />

                                </CCol>

                                <CCol md={4}>
                                    <CFormLabel htmlFor="isfreeshipping">Free shipping</CFormLabel>
                                    <CFormSwitch checked={product.isfreeshipping} onChange={(e) => { handleUpdate(e, 'isfreeshipping'); }} id="isfreeshipping" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="shipseparately">Ship separately</CFormLabel>
                                    <CFormSwitch checked={product.shipseparately} onChange={(e) => { handleUpdate(e, 'shipseparately'); }} id="shipseparately" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="additionalshippingcharge">Additional shipping charge
                                    </CFormLabel>
                                    <CFormInput value={product.additionalshippingcharge} onChange={(e) => { handleUpdate(e, 'additionalshippingcharge'); }} type="number" id="additionalshippingcharge" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="deliverydate">Delivery Date</CFormLabel>
                                    <CFormSelect value={product.deliveryid} onChange={(e) => { handleUpdate(e, 'deliveryid'); }} id="deliverydate">
                                        <option value={0}>Choose...</option>
                                        {deliverydates.map((item, index) => <option value={item?.id} >{item?.name}</option>)}
                                    </CFormSelect>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Inventory</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="inventorymethod">Inventory method</CFormLabel>
                                    <CFormSelect id="inventorymethod">
                                        <option value={0}>Choose...</option>
                                        <option value={1}>Track Inventory</option>
                                    </CFormSelect>
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="orderminimumquantity">Minimum cart qty</CFormLabel>
                                    <CFormInput value={product.orderminimumquantity} onChange={(e) => { handleUpdate(e, 'orderminimumquantity'); }} type="number" id="orderminimumquantity" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="ordermaximumquantity">Maximum cart qty</CFormLabel>
                                    <CFormInput value={product.ordermaximumquantity} onChange={(e) => { handleUpdate(e, 'ordermaximumquantity'); }} type="number" id="ordermaximumquantity" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="allowedquantities">Allowed quantities</CFormLabel>
                                    <CFormInput value={product.allowedquantities} onChange={(e) => { handleUpdate(e, 'allowedquantities'); }} type="text" id="allowedquantities" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="notreturnable">Not returnable</CFormLabel>
                                    <CFormSwitch checked={product.notreturnable} onChange={(e) => { handleUpdate(e, 'notreturnable'); }} id="notreturnable" />

                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>SEO</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="sename">Search engine friendly page name</CFormLabel>
                                    <CFormInput value={product.sename} onChange={(e) => { handleUpdate(e, 'sename'); }} type="text" id="sename" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="metatitle">Meta title</CFormLabel>
                                    <CFormInput value={product.metatitle} onChange={(e) => { handleUpdate(e, 'metatitle'); }} type="text" id="metatitle" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="metakeywords">Meta keywords</CFormLabel>
                                    <CFormInput value={product.metakeywords} onChange={(e) => { handleUpdate(e, 'metakeywords'); }} type="text" id="metakeywords" />

                                </CCol>
                                <CCol md={12}>
                                    <CFormLabel htmlFor="metadescription">Meta description</CFormLabel>
                                    <CFormTextarea value={product.metadescription} onChange={(e) => { handleUpdate(e, 'metadescription'); }}
                                        id="metadescription"
                                        rows={3}
                                    ></CFormTextarea>

                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Other</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="recurringtotalcycles">Recurring product</CFormLabel>
                                    <CFormSwitch checked={product.recurringtotalcycles} onChange={(e) => { handleUpdate(e, 'recurringtotalcycles'); }} id="recurringtotalcycles" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="isgiftcard">Is gift card</CFormLabel>
                                    <CFormSwitch checked={product.isgiftcard} onChange={(e) => { handleUpdate(e, 'isgiftcard'); }} id="isgiftcard" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="isdownload">Downloadable product</CFormLabel>
                                    <CFormSwitch checked={product.isdownload} onChange={(e) => { handleUpdate(e, 'isdownload'); }} id="isdownload" />

                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="isrental">Is rental</CFormLabel>
                                    <CFormSwitch checked={product.isrental} onChange={(e) => { handleUpdate(e, 'isrental'); }} id="isrental" />

                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CForm>
    )
}

const Validation = () => {
    return (
        <div >{CustomStyles()}</div>
        // <CRow>
        //     <CCol xs={12}>
        //         <CCard className="mb-4">
        //             <CCardHeader>
        //                 <strong>Product Info</strong>
        //             </CCardHeader>
        //             <CCardBody>

        //                 <div >{CustomStyles()}</div>
        //             </CCardBody>
        //         </CCard>
        //     </CCol>


        // </CRow>
    )
}

export default Validation
