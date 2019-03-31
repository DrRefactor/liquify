import React from 'react';
import styled from 'styled-components';
import { Formik, Field } from 'formik';
import { FormField } from '../common/FormField';
import { Colors } from '../constants/Colors';
import { CommonStyles } from '../constants/CommonStyles';
import { SupplierService } from '../../backend/supplier/service/supplier';
import { LoadingOverlay } from '../common/Loading/Overlay';

export class OfferEdit extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          {/* <Title>Edit offer</Title> */}
        </Header>
        <FormContainer>
          <OfferEditForm />
        </FormContainer>
      </Container>
    )
  }
}

function OfferEditForm(props) {
  return (
    <Formik
        initialValues={{
          supplier: '',
          ratio: '',
          expirationDate: '',
          invoiceFilename: '',
          invoiceFileData: null
        }}
        onSubmit={(values, { setSubmitting }) => {
          const {
            supplier,
            ratio,
            expirationDate,
            invoiceFilename,
            invoiceFileData
          } = values
          SupplierService
            .uploadInvoice(invoiceFilename, invoiceFileData)
            .then(({ id: invoiceId }) => SupplierService
              .postOffer({ invoiceId, expirationDate, ratio, supplier })
              .then(res => {
                setSubmitting(false);
              })
            )
        }}
      >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          setFieldValue,
          isValid
        } = props;
        return (
          <Form onSubmit={handleSubmit}>
            {isSubmitting && <LoadingOverlay />}
            <FormField
              id='supplier'
              label="Supplier name"
              value={values.supplier}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormField
              id='ratio'
              label="Ratio"
              value={values.ratio}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormField
              id='expirationDate'
              label="Expiration date"
              type='date'
              value={values.expirationDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormField
              type='file'
              id='invoice'
              label="Invoice [.pdf]"
              onChange={e => {
                  var file = e.target.files[0];
                  var reader = new FileReader();
                  setFieldValue("invoiceFilename", file.name);
                  reader.onload = function(item) {
                      setFieldValue("invoiceFileData",  item.target.result);
                  };

                  reader.readAsDataURL(file);
              }}
            />
            <ActionRow>
              <PrimaryButton
                disabled={false}
                type="submit"
                style={{ margin: '20px' }}
              >Submit</PrimaryButton>
              <PrimaryButton
                type="button"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
                style={{ margin: '20px' }}
              >Reset</PrimaryButton>
            </ActionRow>
          </Form>
        );
      }}</Formik>
  )
}

const PrimaryButton = styled.button`
  border: none;
  outline: none;
  cursor: ${props => props.disabled ? 'auto' : 'pointer'};
  margin: auto;
  background-color: ${Colors.primaryTool};
  color: ${props => props.disabled ? Colors.fontLightDisabled : Colors.fontLight};
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: ${CommonStyles.borderRadius};
`

const Form = styled.form`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  position: relative;
`

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Title = styled.span`

`

const ActionRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`