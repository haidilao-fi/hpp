import React from 'react'
import styled from 'styled-components'

import Input, { InputProps } from '../../../components/Input'

interface TokenInputProps extends InputProps {
  placeholder: string,
}

const InfoInput: React.FC<TokenInputProps> = ({
  onChange,
  value,
  placeholder
}) => {
  return (
    <StyledInfoInput>
      <Input
        endAdornment={(
            <span></span>
        )}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </StyledInfoInput>
  )
}
const StyledInfoInput = styled.div`
    margin-bottom:10px;
`
export default InfoInput