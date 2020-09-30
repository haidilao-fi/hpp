import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import InfoInput from "./InfoInput";
import styled from "styled-components";
import useRegisterSeller from "../../../hooks/useRegisterSeller";
import Spacer from "../../../components/Spacer";

interface DepositModalProps extends ModalProps {
}

const RegisterSeller: React.FC<DepositModalProps> = ({}) => {
    const [ethAddr, setEthAddr] = useState('')
    const [name, setName] = useState('')
    const [addr, setAddr] = useState('')
    const [introduction, setIntroduction] = useState('')
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')

    const [pendingTx, setPendingTx] = useState(false)
    const { onRegister } = useRegisterSeller()

    const handleEthAddrChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
        setEthAddr(e.currentTarget.value)
    },
    [setEthAddr],
    )

    const handleNameChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setName(e.currentTarget.value)
        },
        [setName],
    )

    const handleAddrChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setAddr(e.currentTarget.value)
        },
        [setAddr],
    )

    const handleIntroductionChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setIntroduction(e.currentTarget.value)
        },
        [setIntroduction],
    )

    const handleLongitudeChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setLongitude(e.currentTarget.value)
        },
        [setLongitude],
    )

    const handleLatitudeChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setLatitude(e.currentTarget.value)
        },
        [setLatitude],
    )

    return (
    <Modal>
        <StyledInfo>
            <b>Warning : Be sure to add a real merchant, and ensure that merchant accept 10% off HPP consumption; Otherwise, you will lose your deposit and lose your status as a salesman!</b>
        </StyledInfo>
      <ModalTitle text={`Add merchant`} />
        <InfoInput
            value={ethAddr}
            onChange={handleEthAddrChange}
            placeholder={`Merchant\`s ethereum address`}
        />
        <InfoInput
            value={name}
            onChange={handleNameChange}
            placeholder={`Merchant\`s name`}
        />
        <InfoInput
            value={addr}
            onChange={handleAddrChange}
            placeholder={`The detailed address of the merchant`}
        />
        <InfoInput
            value={introduction}
            onChange={handleIntroductionChange}
            placeholder={`Merchant\`s introduction`}
        />
        <InfoInput
            value={longitude}
            onChange={handleLongitudeChange}
            placeholder={`Longitude of merchant location`}
        />
        <InfoInput
            value={latitude}
            onChange={handleLatitudeChange}
            placeholder={`Latitude of merchant location`}
        />
      <ModalActions>
        <Button
          disabled={pendingTx}
          text={pendingTx ? 'Pending Confirmation' : 'Confirm'}
          onClick={async () => {
            setPendingTx(true)
            // const isSeller = useCheckIsSeller(ethAddr)
            // if(isSeller) {
            //     console.log("---------")
            //     alert("已经是商家了")
            //     return
            // }
            //   console.log("===========")
            await onRegister(ethAddr, name, introduction, addr, longitude, latitude)
            setPendingTx(false)
          }}
        />
      </ModalActions>
        <StyledInfo>
            🏆<b>Pro Tip</b>: You can use the following tool to pick up the latitude and longitude <br/>
            <StyledA href="https://www.google.com/maps/" target="_blank">Google</StyledA>
            <StyledA href="http://api.map.baidu.com/lbsapi/getpoint/" target="_blank">Baidu</StyledA>
          </StyledInfo>
        <Spacer size="lg" />
    </Modal>
  )
}

const StyledA = styled.a`
    color:gray;
    text-decoration:none;
    padding-left: 10px;
    padding-right: 10px;
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 12px;
  font-weight: 400;
  margin-top: 30px;
  padding: 0;
  text-align: center;

  > b {
    color: red;
  }
`

export default RegisterSeller
