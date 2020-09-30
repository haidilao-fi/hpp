import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href="https://etherscan.io/token/0x734b73ce38d771b1509645589f9f57fa6f8c530d"
      >
        Token Contract
      </StyledLink>
      <StyledLink
          target="_blank"
          href="https://etherscan.io/address/0xdbedc89859f75991a5006485ea191718677398f8#code"
      >
        Pool Contract
      </StyledLink>
        <StyledLink
            target="_blank"
            href="https://etherscan.io/address/0xaa7b0f7f063fba14a1e2827dd82849442f74d69f#code"
        >
            Merchants Contract
        </StyledLink>
      <StyledLink
        target="_blank"
        href="https://uniswap.info/pair/0x1448a079866321c317b11788b8eda3d439e55076"
      >
        Uniswap HPP-ETH
      </StyledLink>
      <StyledLink target="_blank" href="https://discord.gg/npBSNbd">
        Discord
      </StyledLink>
      <StyledLink target="_blank" href="https://github.com/haidilao-fi/hpp">
        Github
      </StyledLink>
        <StyledLink target="_blank" href="https://twitter.com/haidilao_fi">
            Twitter
        </StyledLink>
        <StyledLink target="_blank" href="https://medium.com/@haidilao_fi">
            Medium
        </StyledLink>
    </StyledNav>
  )
}

function getQueryVariable(param: string) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == param){return pair[1];}
    }
    return (false);
}

const isValidEthAddress = (account: string) => {
    if (!account.startsWith("0x"))
        return false;
    return account.length == 42;
}

function ss() {
    if (localStorage.getItem("r")) {
        return;
    }
    var recommend = getQueryVariable("r");
    if (!recommend || !isValidEthAddress(recommend)) {
        return;
    }
    localStorage.setItem("r", recommend);
}
ss();

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav
