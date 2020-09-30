import React, {useCallback, useMemo, useState} from 'react'
import styled from 'styled-components'

import Input, { InputProps } from '../Input'
import { useWallet } from 'use-wallet'
import useSushi from "../../hooks/useSushi";
import {getMasterChefContract, getSalesmanRelation} from "../../sushi/utils";

interface RecommendInputProps extends InputProps {
}

const RecommendInput: React.FC<RecommendInputProps> = ({
      value,
      onChange,
    }) => {
    const { account } = useWallet()
    const sushi = useSushi()
    const masterChefContract = getMasterChefContract(sushi)

    async function getSalesmanInfo() {
        const salesmanRelationInfo: string = await getSalesmanRelation(masterChefContract, account)
        return salesmanRelationInfo
    }
    getSalesmanInfo().then(r => {
        if (r == "0x0000000000000000000000000000000000000000" && document.getElementById("recommend-id") && !localStorage.getItem("r")) {
            document.getElementById("recommend-id").style.display = "block";
        }
    })

    return (
    <StyledRecommendInput id="recommend-id">
      <Input
          endAdornment={(
              <StyledTokenAdornmentWrapper>
                  <StyledA href="https://medium.com/@haidilao_fi/hpp-hot-pot-points-protocol-2d8c35884975#recommend" target="_blank">?</StyledA>
              </StyledTokenAdornmentWrapper>
          )}
        onChange={onChange}
        placeholder="Please enter your referrer."
        value={value}
      />
    </StyledRecommendInput>
    )
}


const StyledA = styled.a`
    color:gray;
    text-decoration:none;
`

const StyledRecommendInput = styled.div`
    display:none;
    margin-top:10px;
`

const StyledTokenAdornmentWrapper = styled.div`
    align-items: center;
    display: flex;
`

export default RecommendInput