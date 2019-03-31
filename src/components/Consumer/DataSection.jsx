import React from 'react'
import { ConsumerService } from '../../backend/consumer/service/consumer';
import { Details } from '../common/Details';
import styled from 'styled-components';
import { LoadingOverlay } from '../common/Loading/Overlay';

export class DataSection extends React.Component {
  state = {
    offer: null,
    loading: true
  }
  componentDidMount() {
    const id = 17
    ConsumerService
      .getOffer(id)
      .then(offer => this.setState({ offer, loading: false }))
  }

  render() {
    const { offer, loading } = this.state
    
    const fields = Object
      .entries(flattenObject(offer || {}))
      .map(([key, value]) => ({
        name: key,
        label: key,
        value
      }))
    return (
      <Container >
        {loading && <LoadingOverlay />}
        <OfferDetails
          fields={fields}
        />
      </Container>
    )
  }
}

function flattenObject(obj) {
  return Object.entries(obj)
    .reduce((r, [key, value]) => {
      if (typeof value === 'object') {
        return { ...r, ...flattenObject(value) }
      }
      return { ...r, [key]: value }
    }, {})
}

const OfferDetails = styled(Details)`
  width: 80%;
`

const Container = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  flex-grow: 1;
  padding-top: 24px;
`