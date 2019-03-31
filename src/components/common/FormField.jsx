import React, { useState } from 'react';
import styled from 'styled-components';

export function FormField(props) {
  const { children, label, id, ...propz} = props
  const [idOrRandom] = useState(
    id != null ?
    id :
    '' + Math.random()  
  )
  return (
    <Field>
      <label htmlFor={idOrRandom}>
        {label || children}
      </label>
      <Input
        id={idOrRandom}
        {...propz}
      />
    </Field>
  );
}

const Input = styled.input`
  width: 100%;
  border: none;
  border: 1px solid #eee;
  border-radius: 5px;
  outline: none;
  padding: 5px;
  box-sizing: border-box;
`

const Field = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 45%;
  margin-left: auto;
  margin-right: auto;
`