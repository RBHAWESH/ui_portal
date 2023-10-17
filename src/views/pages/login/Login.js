import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import authapi from 'src/views/api/auth.api'
import { User } from 'src/views/model/user.model'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [validated, setValidated] = useState(false)
  const [user, setUser] = useState(User.getEmptyUser());
  const notify = (text) => toast(text);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)

    authapi.login(user).then(result => {
      let response = JSON.parse(result);
     // console.log(result);
      if (response){
      
        console.log(response.message);
        notify(response.message);
        if(response.status === 200){
          navigate("/dashboard");
        }
      }
        
    });
  }
  const handleUpdate = (e, key) => {
    user[key] = e.target.value;
    setUser({ ...user });
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm className="row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput value={user.email} onChange={(e) => { handleUpdate(e, 'email'); }} placeholder="Username" autoComplete="username" required />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput value={user.user_password} onChange={(e) => { handleUpdate(e, 'user_password'); }}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password" required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>

                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  )
}

export default Login
