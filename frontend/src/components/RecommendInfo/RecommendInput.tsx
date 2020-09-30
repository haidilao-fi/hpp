import React, {useCallback, useMemo, useState} from 'react'
import styled from 'styled-components'

import Input  from '../Input'
import { useWallet } from 'use-wallet'
import Button from "../Button";

const RecommendInfo: React.FC = () => {
    const { account } = useWallet()
    const onchange = function() {
    }
    const doCopy = function() {
        alert(1);
    }
    return (
    <StyledRecommendInput>
        <div>Your Reffer:</div>
      <Input
          endAdornment={(
              <StyledTokenAdornmentWrapper>
                  <div>
                      <Button size="sm" text="Copy" onClick={doCopy} />
                  </div>
              </StyledTokenAdornmentWrapper>
          )}
        placeholder=""
        value={('https://haidilao.fi?r=')+account.toLowerCase()}
       onChange={onchange}/>
    </StyledRecommendInput>
    )
}


const StyledA = styled.a`
    color:gray;
    text-decoration:none;
`

const StyledRecommendInput = styled.div`
    margin-top:10px;
`

const StyledTokenAdornmentWrapper = styled.div`
    align-items: center;
    display: flex;
`

export default RecommendInfo