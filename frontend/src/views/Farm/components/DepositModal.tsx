import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import TokenInput from '../../../components/TokenInput'
import RecommendInput from '../../../components/RecommendInput'
import { getFullDisplayBalance } from '../../../utils/formatBalance'

interface DepositModalProps extends ModalProps {
  max: BigNumber
  onConfirm: (amount: string, recommend: string) => void
  tokenName?: string
}

const DepositModal: React.FC<DepositModalProps> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
}) => {
  const [val, setVal] = useState('')
  const [recommend, setRecommend] = useState('')
  const [pendingTx, setPendingTx] = useState(false)

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

    const handleRecommend = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setRecommend(e.currentTarget.value)
        },
        [setRecommend],
    )

  return (
    <Modal>
      <ModalTitle text={`Deposit ${tokenName} Tokens`} />
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <RecommendInput
          value={recommend}
          onChange={handleRecommend}
      />
      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
        <Button
          disabled={pendingTx}
          text={pendingTx ? 'Pending Confirmation' : 'Confirm'}
          onClick={async () => {
            setPendingTx(true)
            let r = localStorage.getItem("r")
            if(!r) {
                r = recommend
            }
            await onConfirm(val, r)
            setPendingTx(false)
            onDismiss()
          }}
        />
      </ModalActions>
    </Modal>
  )
}

export default DepositModal
