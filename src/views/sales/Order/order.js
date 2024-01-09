import { CListGroup, CListGroupItem } from '@coreui/react'
import React from 'react'

const Order = () => {

  return (
    <>
      <CListGroup>
        <CListGroupItem disabled>Cras justo odio</CListGroupItem>
        <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
        <CListGroupItem>Morbi leo risus</CListGroupItem>
        <CListGroupItem>Porta ac consectetur ac</CListGroupItem>
        <CListGroupItem>Vestibulum at eros</CListGroupItem>
      </CListGroup>
    </>
  )
}

export default Order
