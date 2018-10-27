import React from 'react';
import { Link as RouterLink } from "@reach/router";
import styled from 'react-emotion';
import { routes } from '../../constants';
import Curve from '../../components/Curve';
import '../../styles/gradient.css';

const Header = styled('h1')({
  color: '#fff',
  padding: '0 20px',
  margin: '0 auto 16px'
});

const SubHeader = styled(Header)({
  fontWeight: 500,
  color: '#fff',
  fontSize: 24
});

const LandingHeader = styled('div')({
  width: '100%',
  margin: '54px 20px',
  maxWidth: 1000,
  display: 'flex',
  justifyContent: 'space-between',
});

const LandingMessage = styled(LandingHeader)({
  flexDirection: 'column',
  textAlign: 'center',
  maxWidth: 1000,
  'h1': {
    display: 'block'
  }
});

const LinksContainer = styled('div')({

});

const Logo = styled('div')({
  marginLeft: 15,
  background: 'green',
  width: 50,
  height: 50,
});

const LinkButton = styled('a')({});

export default function Scene ({loggedIn, onLogout, ...props}) {
  return (
    <div className="container-gradient" style={{
      width: '100%',
      height: 600,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <LandingHeader>
        <Logo />
        {loggedIn ? (
          <LinksContainer>
            <RouterLink to={routes.INBOX}>inbox</RouterLink>
            <LinkButton href="javascript:void(0);" onClick={onLogout}>logout</LinkButton>
          </LinksContainer>
        ) : (
          <RouterLink to={routes.LOGIN}>login</RouterLink>
        )}
      </LandingHeader>
      <LandingMessage>
        <Header>Conquer your notifications</Header>
        <SubHeader>Take back control over your GitHub notifications</SubHeader>
      </LandingMessage>
      <Curve />
    </div>
  );
};
