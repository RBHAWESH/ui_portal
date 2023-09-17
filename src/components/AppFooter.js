import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="me-1">Wall Herb</span>
        <span className="ms-1">&copy; 2023 creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by Wall Herb &amp; Tech Team</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
