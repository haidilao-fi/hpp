import React from 'react'
import styled from 'styled-components'
import chef from '../../assets/img/chef.png'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import MarketInfos from "./components/MarketInfos";
import Countdown, {CountdownRenderProps} from "react-countdown";
import {useWallet} from "use-wallet";
import Card from "../../components/Card";
import CardContent from "../../components/CardContent";
import Copy from "copy-to-clipboard";
import Notifications, {notify} from 'react-notify-toast';
import Button from "./components/Button";

const Home: React.FC = () => {

    const { account }: { account: any; ethereum: any } = useWallet()
    const startTime = 1602615002
    // const startTime = 0

    const poolActive = startTime * 1000 - Date.now() <= 0

    const renderer = (countdownProps: CountdownRenderProps) => {
        const { days, hours, minutes, seconds } = countdownProps
        const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
        const paddedHours = hours < 10 ? `0${hours}` : hours
        return (
            <div style={{ width: '100%' }}>
                <div style={{padding: '12px 0'}}>
                    <Value>{days}</Value>Days <Value>{paddedHours}</Value>Hours <Value>{paddedMinutes}</Value>Mins <Value>{paddedSeconds}</Value>Secs
                </div>
                <div>Start of block<StyledA href="https://etherscan.io/block/11050000" target="_blank">11050000</StyledA></div>
            </div>
        )
    }

    const doCopy = function() {
        let url = 'https://haidilao.fi?r='+account.toLowerCase()
        Copy(url)
        notify.show("Copied.", "success");
    }
return (
    <Page>
      <PageHeader
        icon={<img src={chef} height={120} />}
        title="Hot Pot Points is Ready"
        subtitle="Let us work together to promote the application of the encryption industry!"
      />

      {!poolActive ? (
          <Container>
              <StyledWrapper>
                  <Card>
                      <CardContent>
                          <span style={{ width: '100%' }}>
                            COMING SOON
                          </span>
                          <Countdown
                              date={new Date(startTime * 1000)}
                              renderer={renderer}
                          />
                          <StyledMore>
                              <Button
                                  size="sm"
                                  width="138"
                                  text={'Learn more'}
                                  href={`https://medium.com/@haidilao_fi/hpp-hot-pot-points-protocol-2d8c35884975`}
                              />
                          </StyledMore>
                      </CardContent>
                  </Card>
                  <Spacer />
              </StyledWrapper>
          </Container>
      ) : (
          <Container>
              <Balances />
              <SpacerX/>
              <MarketInfos />
              <Spacer size="lg" />
              <StyledInfo>
                  {
                      account? (
                          <div>
                              🏆<b>Your referral link</b>: {('https://haidilao.fi?r=')+account.toLowerCase()}
                              <StyledA href="javascript:;" onClick={doCopy}>Copy</StyledA>
                          </div>
                      ):''
                  }
              </StyledInfo>
              <Spacer size="lg" />
              <Notifications options={{zIndex: 200, top: '350px'}}/>
          </Container>
      )}
    </Page>
  )
}

const StyledMore = styled.div`
    margin:38px auto;
    text-align: center;
    align-items: center;
`

const StyledA = styled.a`
    color:gray;
    text-decoration:none;
    margin: 0 10px;
`

const StyledWrapper = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

const SpacerX = styled.h1`
`

const Value = styled.span`
    font-size: 28px;
`

export default Home
